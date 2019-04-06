import { Component, OnInit, ViewChild, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldService } from './../../../../services/field.service';
import { AlertService } from '../../../../shared/alert.service';
import { TypeField } from '../../../../models/index';

@Component({
   selector: 'create-field',
   templateUrl: 'create-field.html'
})

export class CreateFieldComponent implements OnInit {
   @ViewChild('modalCreateField') modalCreateField: ModalDirective;
   @Input() cmbTypesFields: TypeField[];
   @Output() dispatchEvent = new EventEmitter();
   form: FormGroup;
   loaderButton: boolean = false;
   submit: boolean = false;

   constructor(
      private service: FieldService,
      private fb: FormBuilder,
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
   
   /** create form */
   createForm() {
      this.form = this.fb.group({
         name: ['', Validators.compose([
            Validators.required,
         ])],
         qt_players: ['', Validators.compose([
            Validators.required,
         ])],
         type_field_id: ['', Validators.compose([
            Validators.required
         ])]
      });
   }

   /** show modal */
   showModal() {
      this.modalCreateField.show();
   }

   /** hide modal */
   hideModal() {
      this.submit = false;
      this.form.reset({ type_field_id: '' });
      this.modalCreateField.hide();
   }

   /** save */
   save(form: FormGroup) {
      this.submit = true;
      if (form.valid && this.submit) {
         const values = form.value;
         values.enabled = true;
         
         this.loaderButton = true;
         this.service.create(values).subscribe(
            (data) => {
               this.alertService.showMessage('Canchas', 'Se creó el registro correctamente', 'success');
               this.dispatchEvent.emit();
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

}