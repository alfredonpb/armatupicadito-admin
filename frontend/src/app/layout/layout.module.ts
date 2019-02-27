import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** plugins */
import { ModalModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

/** directives */

/** componenets */
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

import { HeaderComponent } from './header/index';
import { SidebarComponent } from './sidebar/index';
import { FooterComponent } from './footer/index';

import { HomeComponent } from './home/index';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      LayoutRoutingModule,
      ModalModule.forRoot(),
      TooltipModule.forRoot()
   ],
   declarations: [
      LayoutComponent,
      HeaderComponent,
      SidebarComponent,
      FooterComponent,
      HomeComponent
   ],
   providers: [
     
   ]
})
export class LayoutModule { }
