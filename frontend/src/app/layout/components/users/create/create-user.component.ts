import { Component, OnInit, ViewChild, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../../../services/user.service';
import { Profile } from './../../../../models/index';
import { AlertService } from '../../../../shared/alert.service';

@Component({
   selector: 'create-user',
   templateUrl: 'create-user.html'
})

export class CreateUserComponent implements OnInit {
   @ViewChild('modalCreateUser') modalCreateUser: ModalDirective;
   @Input() cmbProfiles: Profile[] = [];
   @Output() dispatchEvent = new EventEmitter();
   form: FormGroup;
   loaderButton: boolean = false;
   submit: boolean = false;

   constructor(
      private service: UserService,
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
   
   /** create form create user */
   createForm() {
      this.form = this.fb.group({
         name: ['', Validators.compose([
            Validators.required,
         ])],
         lastname: ['', Validators.compose([
            Validators.required,
         ])],
         email: ['', Validators.compose([
            Validators.required,
            Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/im)
         ])],
         phone: ['', Validators.compose([
            Validators.required,
         ])],
         profile_id: ['', Validators.compose([
            Validators.required,
         ])],
         password: ['', Validators.compose([
            Validators.required,
            Validators.minLength(6)
         ])],
         repeat_password: ['', Validators.compose([
            Validators.required,
            Validators.minLength(6)
         ])],
      });
   }

   /** show modal */
   showModal() {
      this.modalCreateUser.show();
   }

   /** hide modal */
   hideModal() {
      this.submit = false;
      this.form.reset({ profile_id: '' });
      this.modalCreateUser.hide();
   }

   /** save user */
   save(form: FormGroup) {
      this.submit = true;
      if (form.valid && this.submit) {
         const values = form.value;
         values.enabled = true;

         if (!this.equalsPasswords(values)) {
            this.alertService.showMessage('Campos incorrectos', 'Las contraseñas no coinciden', 'warning');
            return false;
         }
         
         this.loaderButton = true;
         this.service.create(values).subscribe(
            (data) => {
               this.alertService.showMessage('Usuarios', 'Se creó el registro correctamente', 'success');
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

   /** validate if equals password fields */
   equalsPasswords(values: any) {
      if (values.password === values.repeat_password) { return true; }
      return false;
   }

}