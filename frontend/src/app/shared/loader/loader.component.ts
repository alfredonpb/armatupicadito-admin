import { Component, OnInit, Input } from '@angular/core';

@Component({
   selector: 'loader',
   templateUrl: 'loader.html'
})

export class LoaderComponent implements OnInit {
   @Input() loader: boolean;

   constructor() { }

   ngOnInit() { }
}