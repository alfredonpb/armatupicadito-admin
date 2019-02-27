import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';

@Component({
   selector: 'login',
   templateUrl: 'login.html'
})

export class LoginComponent implements OnInit, OnDestroy {
   constructor() { }

   ngOnInit() { 
      $('#page-top').addClass('bg-gradient-primary');
   }

   ngOnDestroy() { 
      $('#page-top').removeClass('bg-gradient-primary');
   }
   
}