import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   selector: 'layout',
   templateUrl: './layout.html',
})

export class LayoutComponent implements OnInit {
   constructor(
      public router: Router,
   ) { }

   ngOnInit() {
      if (this.router.url === '/') { this.router.navigate(['/home']); }
   }

}
