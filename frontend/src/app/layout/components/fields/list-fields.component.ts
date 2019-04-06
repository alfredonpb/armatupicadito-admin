import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { FieldService } from '../../../services/field.service';
import { AlertService } from '../../../shared/alert.service';
import { Field } from '../../../models';
// import { CreateUserComponent } from './create/index';
// import { EditUserComponent } from './edit/index';
import { ModalConfirmComponent } from '../../../shared/modal-confirm/index';

@Component({
   selector: 'list-fields',
   templateUrl: 'list-fields.html'
})

export class ListFieldComponent implements OnInit {
   // @ViewChild('modalCreateUser') modalCreateUser: CreateUserComponent;
   // @ViewChild('modalEditUser') modalEditUser: EditUserComponent;
   @ViewChild('modalConfirm') modalConfirm: ModalConfirmComponent;
   objectChangeStatus: any;
   listFields: Field[] = [];
   page: number = -1;
   emptyList: boolean = false;
   nextPage: boolean = false;
   loader: boolean = false;

   /** filter */
   filterFields: any = {
      search: '',
      enabled: true
   };

   constructor(
      private service: FieldService,
      private alertService: AlertService
   ) { }

   ngOnInit() { 
      this.filter();
   }

   /** event entet to filter */
   // @HostListener('keydown', ['$event'])
   // eventSearch(event: any) {
   //    if (event.keyCode === 13 && !this.modalCreateUser.modalCreateUser.isShown && !this.modalEditUser.modalEditUser.isShown) { 
   //       this.initFilter(this.filterFields);
   //    }
   // }

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

   /** update list of user */
   updateList(event: any) {
      this.listFields[event.index] = event.user;
   }

   /** confirm change status */
   confirmChangeStatus(field: Field, index: number, enabled: boolean) {
      this.objectChangeStatus = { field, index, enabled };
      this.modalConfirm.showModal(`cambiar estado de ${field.name} a ${enabled ? 'habilitado' : 'deshabilitado'}`);
   }

   /** change status of user */
   changeStatus() {
      this.loader = true;
      this.objectChangeStatus.user.enabled = this.objectChangeStatus.enabled;
      this.service.update(this.objectChangeStatus.user, this.objectChangeStatus.user.id).subscribe(
         (data: any) => {
            this.alertService.showMessage('Canchas', 'Se cambió el estado correctamente', 'info');
            
            const event = { index: this.objectChangeStatus.index, user: data.data };
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