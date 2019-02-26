import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-sidebar',
   templateUrl: 'sidebar.html'
})

export class SidebarComponent implements OnInit {
   toggle: boolean = false;

   constructor() { }

   ngOnInit() { }

   /** toggle sidebar */
   toggleSidebar() {
      this.toggle = this.toggle ? false : true;
   }
}