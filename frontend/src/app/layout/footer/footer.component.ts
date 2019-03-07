import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.test';

@Component({
   selector: 'app-footer',
   templateUrl: 'footer.html'
})

export class FooterComponent implements OnInit {
   version: string = environment.version;

   constructor() { }

   ngOnInit() { 
   }
}