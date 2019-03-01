import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SessionStorageClass, SessionStorageModel } from 'src/app/shared/session-storage/index';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';

@Component({
   selector: 'app-header',
   templateUrl: 'header.html'
})

export class HeaderComponent implements OnInit {
   toggleMenu: boolean = false;
   sessionUser: SessionStorageModel;
   
   constructor(
      private authService: AuthService
   ) { }

   ngOnInit() { 
      this.sessionUser = SessionStorageClass.getItem(environment.keySessionStorage);
   }

   /** toggle sidebar */
   toggleSidebar(){
      this.toggleMenu = this.toggleMenu ? false : true;
      if (this.toggleMenu) { $('#accordionSidebar').addClass('toggled'); }
      else { $('#accordionSidebar').removeClass('toggled'); }
   }

   /** logout */
   logout() {
      this.authService.logout();
   }

}