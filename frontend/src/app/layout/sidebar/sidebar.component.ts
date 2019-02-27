import { AlertService } from './../../shared/alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-sidebar',
   templateUrl: 'sidebar.html'
})

export class SidebarComponent implements OnInit {
   toggle: boolean = false;

   constructor(
      private alertService: AlertService
   ) { }

   ngOnInit() { }

   /** toggle sidebar */
   toggleSidebar() {
      this.toggle = this.toggle ? false : true;
      this.alertService.showMessage('Título', 'Esto es una alerta', 'success');
   }
}