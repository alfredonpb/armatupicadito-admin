import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-home',
   templateUrl: 'home.html'
})

export class HomeComponent implements OnInit {
   time: Date;

   constructor(
   ) { }

   ngOnInit() { 
      this.getTime();
   }

   /** get current time */
   getTime() {
      setInterval(() => {
         this.time = new Date();
      }, 1000);
   }

}