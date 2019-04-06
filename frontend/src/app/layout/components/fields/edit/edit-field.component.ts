import { Component, OnInit, ViewChild, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Field, TypeField } from '../../../../models/index';
import { FieldService } from '../../../../services/field.service';
import { AlertService } from '../../../../shared/alert.service';

@Component({
   selector: 'edit-field',
   templateUrl: 'edit-field.html'
})

export class EditFieldComponent implements OnInit {
   @ViewChild('modalEditField') modalEditField: ModalDirective;
   @Input() cmbTypesFields: TypeField[] = [];
   @Output() dispatchEvent = new EventEmitter();
   form: FormGroup;
   loaderButton: boolean = false;
   submit: boolean = false;
   selectedField: Field;
   selectedIndex: number;
   
   constructor(
      private service: FieldService,
      private fb: FormBuilder,
      private alertService: AlertService
   ) { }

   ngOnInit() { }

   /** event scape modal */
   @HostListener('keydown.esc', ['$event'])
   eventEscModal(event: any) {
      if (event.keyCode === 27) { this.hideModal(); }
   }

   /** event enter modal */
   @HostListener('keydown.enter', ['$event'])
   eventEnterModal(event: any) {
      if (event.keyCode === 13) { this.edit(this.form); }
   }

   /** show modal */
   showModal(field: Field, index: number) {
      this.selectedField = field;
      this.selectedIndex = index;

      this.createForm(this.selectedField);
      this.modalEditField.show();
   }

   /** hide modal */
   hideModal() {
      this.submit = false;
      this.form.reset();
      this.modalEditField.hide();
   }

   /** create form create field */
   createForm(field: Field) {
      this.form = this.fb.group({
         name: [field.name, Validators.compose([
            Validators.required,
         ])],
         qt_players: [field.qt_players, Validators.compose([
            Validators.required,
         ])],
         type_field_id: [field.type_field_id, Validators.compose([
            Validators.required,
         ])]
      });
   }

   /** edit Field */
   edit(form: FormGroup) {
      this.submit = true;
      if (form.valid && this.submit) {
         const values = form.value;
         values.enabled = this.selectedField.enabled;
         
         this.loaderButton = true;
         this.service.update(values, this.selectedField.id).subscribe(
            (data: any) => {
               this.alertService.showMessage('Canchas', 'Se modificó el registro correctamente', 'success');
               this.dispatchEvent.emit({ field: data.data, index: this.selectedIndex });
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