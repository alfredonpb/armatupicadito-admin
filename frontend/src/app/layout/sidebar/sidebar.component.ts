import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-sidebar',
   templateUrl: 'sidebar.html'
})

export class SidebarComponent implements OnInit {
   toggleMenu: boolean = false;

   constructor(
   ) { }

   ngOnInit() { }

   /** toggle sidebar */
   toggleSidebar() {
      this.toggleMenu = this.toggleMenu ? false : true;
   }
}