import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { FieldService } from '../../../services/field.service';
import { TypeFieldService } from '../../../services/type-field.service';
import { AlertService } from '../../../shared/alert.service';
import { Field, TypeField } from '../../../models';
import { CreateFieldComponent } from './create/index';
import { EditFieldComponent } from './edit/index';
import { ModalConfirmComponent } from '../../../shared/modal-confirm/index';

@Component({
   selector: 'list-fields',
   templateUrl: 'list-fields.html'
})

export class ListFieldComponent implements OnInit {
   @ViewChild('modalCreateField') modalCreateField: CreateFieldComponent;
   @ViewChild('modalEditField') modalEditField: EditFieldComponent;
   @ViewChild('modalConfirm') modalConfirm: ModalConfirmComponent;
   listFields: Field[] = [];
   cmbTypesFields: TypeField[] = [];
   page: number = -1;
   emptyList: boolean = false;
   nextPage: boolean = false;
   loader: boolean = false;
   
   objectChangeStatus: {
      field: Field,
      index: number,
      enabled: boolean
   };

   /** filter */
   filterFields: any = {
      search: '',
      enabled: true
   };

   constructor(
      private service: FieldService,
      private typeFieldService: TypeFieldService,
      private alertService: AlertService
   ) { }

   ngOnInit() { 
      this.filter();
      this.getCmbTypesFields();
   }

   /** event entet to filter */
   @HostListener('keydown', ['$event'])
   eventSearch(event: any) {
      if (event.keyCode === 13 && !this.modalCreateField.modalCreateField.isShown && !this.modalEditField.modalEditField.isShown) { 
         this.initFilter(this.filterFields);
      }
   }

   /** get cmb of types fields */
   getCmbTypesFields() {
      this.typeFieldService.getAll().subscribe(
         (data) => {
            this.cmbTypesFields = data.data;
         },
         (error) => {
            this.alertService.showMessageServer(error);
         }
      );
   }

   /** busqueda */
   search() {
      this.doSearch(this.filterFields);
   }

   /** filtrado */
   filter() {
      this.initFilter(this.filterFields);
   }

   /** ejecutar busqueda */
   doSearch(objectFilter: any) {
      this.filterFields = objectFilter;
      
      this.page++;
      this.filterFields.page = this.page;
      this.loader = true;

      this.doAllPromises(this.filterFields).then(
         (resolved) => {
            const data: any = resolved;

            this.buildList(data[0]);
            this.verifyNextPage(data[1]);

            this.loader = false;
         },
         (rejected) => {
            this.alertService.showMessageServer(rejected);
            this.loader = false;
         }
      );
   }

   /** llenar listado */
   buildList(fields: Field[]) {
      this.listFields = this.listFields.concat(fields);
      this.emptyList = false;
      if (this.listFields.length < 1) { this.emptyList = true; }
   }

   /** verificar datos de proxima pagina */
   verifyNextPage(fields: Field[]) {
      this.nextPage = false;
      if (fields.length > 0) { this.nextPage = true; }
   }

   /** iniciar filtro con valores por defaul */
   initFilter(objectFilter: any) {
      this.page = -1;
      this.listFields = [];
      this.doSearch(objectFilter);
   }

   /** hacer todas las promesas de filtrado */
   doAllPromises(objectFilter: any) {
      const promise = Promise.all([
         this.doPromise(objectFilter, 'current'),
         this.doPromise(objectFilter, 'next')
      ]);

      return promise;
   }

   /** hacer promesa */
   doPromise(objectFilter: any, type: string) {
      const promise = new Promise((resolve, reject) => {
         if (type === 'next') { objectFilter.page++; }
         this.service.getByFilter(objectFilter).toPromise().then(
            data => {
               resolve(data.data);
            },
            error => {
               reject(error);
            }
         );
      });

      return promise;
   }

   /** resetear filtro a valores por default */
   resetFilter() {
      this.filterFields.search = '';
      this.filterFields.enabled = true;

      this.filter();
   }

   /** update list of field */
   updateList(event: any) {
      this.listFields[event.index] = event.field;
   }

   /** confirm change status */
   confirmChangeStatus(field: Field, index: number, enabled: boolean) {
      this.objectChangeStatus = { field, index, enabled };
      this.modalConfirm.showModal(`cambiar estado de ${field.name} a ${enabled ? 'habilitado' : 'deshabilitado'}`);
   }

   /** change status of field */
   changeStatus() {
      this.loader = true;
      this.objectChangeStatus.field.enabled = this.objectChangeStatus.enabled;
      this.service.update(this.objectChangeStatus.field, this.objectChangeStatus.field.id).subscribe(
         (data: any) => {
            this.alertService.showMessage('Canchas', 'Se cambió el estado correctamente', 'info');
            
            const event = { index: this.objectChangeStatus.index, field: data.data };
            this.updateList(event);
            this.loader = false;
         },
         (error) => {
            this.alertService.showMessageServer(error);
            this.loader = false;
         }
      );
   }

   /** confirm operation */
   confirmOperation() {
      this.changeStatus();
   }

   /** decline operation */
   declineOperation() {
      this.objectChangeStatus = null;
   }

}