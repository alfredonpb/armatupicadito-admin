import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderButtonComponent } from './loader-button';

@NgModule({
   declarations: [
      LoaderButtonComponent
   ],
   imports: [
      CommonModule
   ],
   exports: [
      LoaderButtonComponent
   ]
})
export class SharedModule { }