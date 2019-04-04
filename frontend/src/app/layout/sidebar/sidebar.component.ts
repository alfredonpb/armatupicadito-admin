import { Component, OnInit } from '@angular/core';
import { SessionStorageClass, SessionStorageModel } from '../../shared/session-storage/index';
import { environment } from '../../../environments/environment';

@Component({
   selector: 'app-sidebar',
   templateUrl: 'sidebar.html'
})

export class SidebarComponent implements OnInit {
   routing = {
      users: false,
      entities: false
   };
   
   constructor(
   ) { }

   ngOnInit() { 
      this.setRoutingPermissions();
   }

   /** set permissionf of routing */
   setRoutingPermissions() {
      const activeUser: SessionStorageModel = SessionStorageClass.getItem(environment.keySessionStorage);

      if (activeUser.profile.name == 'Superadmin') {
         this.routing.users = true;
         this.routing.entities = true;
      }

      if (activeUser.profile.name == 'Administrador') {
         this.routing.users = true;
      }

   }
}