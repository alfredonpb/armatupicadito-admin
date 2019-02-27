import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';

@Component({
   selector: 'app-home',
   templateUrl: 'home.html'
})

export class HomeComponent implements OnInit {
   dataTest: any;

   constructor(
      private service: TestService
   ) { }

   ngOnInit() { 
      this.getTest();
   }

   getTest() {
      this.service.test().subscribe(
         (data) => {
            this.dataTest = data;
         },
         (error) => {
            console.log(error);
         },
         () => {

         }
      );
   }
}