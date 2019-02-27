import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
   selector: 'app-header',
   templateUrl: 'header.html'
})

export class HeaderComponent implements OnInit {
   toggleMenu: boolean = false;
   
   constructor() { }

   ngOnInit() { }

   /** toggle sidebar */
   toggleSidebar(){
      this.toggleMenu = this.toggleMenu ? false : true;
      if (this.toggleMenu) { $('#accordionSidebar').addClass('toggled'); }
      else { $('#accordionSidebar').removeClass('toggled'); }
   }

}