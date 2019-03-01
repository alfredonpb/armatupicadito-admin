import { Component, OnInit, Input } from '@angular/core';

@Component({
   selector: 'loader-button',
   templateUrl: 'loader-button.html'
})

export class LoaderButtonComponent implements OnInit {
   @Input() loaderButton: boolean;
   
   constructor() { }

   ngOnInit() { }
}