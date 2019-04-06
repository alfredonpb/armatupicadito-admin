import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** guards */
import { AdminGuard, SuperadminGuard } from '../guards/index';

/** modules */
import { SharedModule } from '../shared/shared.module';

/** plugins */
import { ModalModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

/** directives */

/** services */
import { ProfileService } from '../services/profile.service'; 
import { UserService } from '../services/user.service'; 
import { SharedService } from '../services/shared.service'; 
import { TypeFieldService } from '../services/type-field.service';
import { FieldService } from '../services/field.service'; 

/** componenets */
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

import { HeaderComponent } from './header/index';
import { SidebarComponent } from './sidebar/index';
import { FooterComponent } from './footer/index';

import { HomeComponent } from './home/index';

import { ListUserComponent } from './components/users/index';
import { CreateUserComponent } from './components/users/create/index';
import { EditUserComponent } from './components/users/edit/index';

import { ListEntitieComponent } from './components/master-entities/index';
import { CreateEntitieComponent } from './components/master-entities/create/index';

/** shared */
import { LoaderComponent } from '../shared/loader/index';
import { ModalConfirmComponent } from '../shared/modal-confirm/index';

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
      ModalConfirmComponent,
      LayoutComponent,
      HeaderComponent,
      SidebarComponent,
      FooterComponent,
      HomeComponent,
      ListUserComponent,
      CreateUserComponent,
      EditUserComponent,
      ListEntitieComponent,
      CreateEntitieComponent
   ],
   providers: [
      AdminGuard,
      SuperadminGuard,
      ProfileService,
      UserService,
      SharedService,
      TypeFieldService,
      FieldService
   ]
})
export class LayoutModule { }
