import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { AlertService } from '../../../shared/alert.service';
import { Profile, User } from '../../../models';
import { UserService } from '../../../services/user.service';
import { CreateUserComponent } from './create/index';
import { EditUserComponent } from './edit/index';
import { ModalConfirmComponent } from '../../../shared/modal-confirm/index';

@Component({
   selector: 'list-users',
   templateUrl: 'list-users.html'
})

export class ListUserComponent implements OnInit {
   @ViewChild('modalCreateUser') modalCreateUser: CreateUserComponent;
   @ViewChild('modalEditUser') modalEditUser: EditUserComponent;
   @ViewChild('modalConfirm') modalConfirm: ModalConfirmComponent;
   objectChangeStatus: any;
   listUsers: User[] = [];
   cmbProfiles: Profile[] = [];
   page: number = -1;
   emptyList: boolean = false;
   nextPage: boolean = false;
   loader: boolean = false;

   /** filter */
   filterFields: any = {
      search: '',
      profile: '',
      enabled: true
   };

   constructor(
      private service: UserService,
      private profileService: ProfileService,
      private alertService: AlertService
   ) { }

   ngOnInit() { 
      this.filter();
      this.getCmbProfiles();
   }

   /** event entet to filter */
   @HostListener('keydown', ['$event'])
   eventSearch(event: any) {
      if (event.keyCode === 13 && !this.modalCreateUser.modalCreateUser.isShown && !this.modalEditUser.modalEditUser.isShown) { 
         this.initFilter(this.filterFields);
      }
   }

   /** get cmb of profiles */
   getCmbProfiles() {
      this.profileService.getAll().subscribe(
         (data) => {
            this.cmbProfiles = data.data;
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
   buildList(users: User[]) {
      this.listUsers = this.listUsers.concat(users);
      this.emptyList = false;
      if (this.listUsers.length < 1) { this.emptyList = true; }
   }

   /** verificar datos de proxima pagina */
   verifyNextPage(users: User[]) {
      this.nextPage = false;
      if (users.length > 0) { this.nextPage = true; }
   }

   /** iniciar filtro con valores por defaul */
   initFilter(objectFilter: any) {
      this.page = -1;
      this.listUsers = [];
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
      this.filterFields.profile = '';
      this.filterFields.enabled = true;

      this.filter();
   }

   /** update list of user */
   updateList(event: any) {
      this.listUsers[event.index] = event.user;
   }

   /** confirm change status */
   confirmChangeStatus(user: User, index: number, enabled: boolean) {
      this.objectChangeStatus = { user, index, enabled };
      this.modalConfirm.showModal(`cambiar estado de ${user.name} ${user.lastname} a ${enabled ? 'habilitado' : 'deshabilitado'}`);
   }

   /** change status of user */
   changeStatus() {
      this.loader = true;
      this.objectChangeStatus.user.enabled = this.objectChangeStatus.enabled;
      this.service.update(this.objectChangeStatus.user, this.objectChangeStatus.user.id).subscribe(
         (data: any) => {
            this.alertService.showMessage('Usuarios', 'Se cambio el estado del usuario correctamente', 'info');
            
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