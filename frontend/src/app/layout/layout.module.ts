import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** modules */
import { SharedModule } from '../shared/shared.module';

/** plugins */
import { ModalModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

/** directives */

/** services */
import { ProfileService } from '../services/profile.service'; 
import { UserService } from '../services/user.service'; 

/** componenets */
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

import { HeaderComponent } from './header/index';
import { SidebarComponent } from './sidebar/index';
import { FooterComponent } from './footer/index';

import { HomeComponent } from './home/index';

import { ListUserComponent } from './components/users/index';
import { CreateUserComponent } from './components/users/create/index';

/** shared */
import { LoaderComponent } from '../shared/loader/index';

@NgModule({
   imports: [
      SharedModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      LayoutRoutingModule,
      ModalModule.forRoot(),
      TooltipModule.forRoot()
   ],
   declarations: [
      LoaderComponent,
      LayoutComponent,
      HeaderComponent,
      SidebarComponent,
      FooterComponent,
      HomeComponent,
      ListUserComponent,
      CreateUserComponent
   ],
   providers: [
      ProfileService,
      UserService
   ]
})
export class LayoutModule { }
