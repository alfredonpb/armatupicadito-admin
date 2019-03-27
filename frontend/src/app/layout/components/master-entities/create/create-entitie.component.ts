import { Component, OnInit, ViewChild, Output, EventEmitter, HostListener } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../../shared/alert.service';
import { SharedService } from '../../../../services/shared.service';

@Component({
   selector: 'create-entitie',
   templateUrl: 'create-entitie.html'
})

export class CreateEntitieComponent implements OnInit {
   @ViewChild('modalCreateEntitie') modalCreateEntitie: ModalDirective;
   @Output() dispatchEvent = new EventEmitter();
   cmbEntities: any[] = [{ id: 'profile', value: 'Perfiles' }, { id: 'type_field', value: 'Tipos de canchas' }];
   form: FormGroup;
   loaderButton: boolean = false;
   submit: boolean = false;

   constructor(
      private fb: FormBuilder,
      private sharedService: SharedService, 
      private alertService: AlertService
   ) { }

   ngOnInit() { 
      this.createForm();
   }
   
   /** event scape modal */
   @HostListener('keydown.esc', ['$event'])
   eventEscModal(event: any) {
      if (event.keyCode === 27) { this.hideModal(); }
   }

   /** event enter modal */
   @HostListener('keydown.enter', ['$event'])
   eventEnterModal(event: any) {
      if (event.keyCode === 13) { this.save(this.form); }
   }
   
   /** create form create user */
   createForm() {
      this.form = this.fb.group({
         master_entitie: ['', Validators.compose([
            Validators.required,
         ])],
         records: ['', Validators.compose([
            Validators.required,
         ])]
      });
   }

   /** show modal */
   showModal() {
      this.modalCreateEntitie.show();
   }

   /** hide modal */
   hideModal() {
      this.submit = false;
      this.form.reset({ master_entitie: '' });
      this.modalCreateEntitie.hide();
   }

   /** save user */
   save(form: FormGroup) {
      this.submit = true;
      if (form.valid && this.submit) {
         const values = form.value;
         values.records = this.separateRecords(values.records);

         this.loaderButton = true;
         this.sharedService.createEntitie(values).subscribe(
            (data) => {
               this.alertService.showMessage('Tablas maestras', 'Se creó el registro correctamente', 'success');
               this.dispatchEvent.emit({ type: values.master_entitie, data: data.data });
               this.hideModal();
               this.loaderButton = false;
            },
            (error) => {
               this.alertService.showMessageServer(error);
               this.loaderButton = false;
            }
         );
      }else{
         form.markAsPristine();
      }
   }

   /** separate records */
   separateRecords(records: string){ 
      records = records.trim();
      return records.split(',');
   }
}