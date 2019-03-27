import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { TypeFieldService } from '../../../services/type-field.service';
import { AlertService } from '../../../shared/alert.service';
import { Profile, TypeField } from '../../../models/index';
import { ModalConfirmComponent } from '../../../shared/modal-confirm/index';

@Component({
   selector: 'list-entities',
   templateUrl: 'list-entities.html'
})

export class ListEntitieComponent implements OnInit {
   @ViewChild('modalConfirm') modalConfirm: ModalConfirmComponent;
   listProfiles: Profile[] = [];
   listTypesFields: TypeField[] = [];
   loader: boolean = false;
   objectDeleteProfile: any;

   constructor(
      private profileService: ProfileService,
      private typeFieldService: TypeFieldService,
      private alertService: AlertService
   ) { }

   ngOnInit() { 
      this.getListProfiles();
      this.getListTypesFields();
   }

   /** get list of profiles */
   getListProfiles() {
      this.loader = true;
      this.profileService.getAll().subscribe(
         (data) => {
            this.listProfiles = data.data;
            this.loader = false;
         },
         (error) => {
            this.alertService.showMessageServer(error);
            this.loader = false;
         }
      );
   }

   /** get list of types fields */
   getListTypesFields() {
      this.loader = true;
      this.typeFieldService.getAll().subscribe(
         (data) => {
            this.listTypesFields = data.data;
            this.loader = false;
         },
         (error) => {
            this.alertService.showMessageServer(error);
            this.loader = false;
         }
      );
   }

   /** refresh list */
   refreshList(event: any) {
      if (event.type === 'profile') { this.getListProfiles(); }
      if (event.type === 'type_field') { this.getListTypesFields(); }
   }

   /** show modal confirm */
   confirmDeleteProfile(entitie: Profile | TypeField, index: number) {
      this.objectDeleteProfile = { entitie, index };
      this.modalConfirm.showModal('eliminar el perfil seleccionado');
   }

   /** delete item entitie profile */
   deleteProfile() {
      this.loader = true;
      this.profileService.delete(this.objectDeleteProfile.profile.id).subscribe(
         (data) => {
            this.loader = false;
            this.alertService.showMessage('Tablas maestras', 'El registro seleccionado fue eliminado', 'warning');
            this.removeItemList('profile', this.objectDeleteProfile.index);
         },
         (error) => {
            this.alertService.showMessageServer(error);
            this.loader = false;
         }
      );
   }

   /** remove item list */
   removeItemList(type: string, index: number) {
      if (type === 'profile') { this.listProfiles.splice(index, 1); }
   }

   /** confirm operation */
   confirmOperation() {
      this.deleteProfile();
   }

   /** decline operation */
   declineOperation() {
      this.objectDeleteProfile = null;
   }

}