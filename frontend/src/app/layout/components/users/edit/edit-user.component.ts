import { User } from './../../../../models/user.model';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Profile } from '../../../../models/index';
import { UserService } from '../../../../services/user.service';
import { AlertService } from '../../../../shared/alert.service';

@Component({
   selector: 'edit-user',
   templateUrl: 'edit-user.html'
})

export class EditUserComponent implements OnInit {
   @ViewChild('modalEditUser') modalEditUser: ModalDirective;
   @Input() cmbProfiles: Profile[] = [];
   @Output() dispatchEvent = new EventEmitter();
   form: FormGroup;
   loaderButton: boolean = false;
   submit: boolean = false;
   selectedUser: User;
   
   constructor(
      private service: UserService,
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
   showModal(user: User) {
      this.selectedUser = user;
      this.createForm(this.selectedUser);
      this.modalEditUser.show();
   }

   /** hide modal */
   hideModal() {
      this.submit = false;
      this.form.reset();
      this.modalEditUser.hide();
   }

   /** create form create user */
   createForm(user: User) {
      this.form = this.fb.group({
         name: [user.name, Validators.compose([
            Validators.required,
         ])],
         lastname: [user.lastname, Validators.compose([
            Validators.required,
         ])],
         email: [user.email, Validators.compose([
            Validators.required,
            Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/im)
         ])],
         phone: [user.phone, Validators.compose([
            Validators.required,
         ])],
         profile_id: [user.profile_id, Validators.compose([
            Validators.required,
         ])],
         enabled: [user.enabled, Validators.compose([
            Validators.required,
         ])]
      });
   }

   /** edit user */
   edit(form: FormGroup) {
      this.submit = true;
      if (form.valid && this.submit) {
         const values = form.value;
         values.enabled = true;
         
         this.loaderButton = true;
         this.service.update(values, this.selectedUser.id).subscribe(
            (data: any) => {
               this.alertService.showMessage('Usuarios', 'Se modificó con éxito', 'success');
               this.dispatchEvent.emit({ user: data.data });
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