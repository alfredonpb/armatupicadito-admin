import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home';
import { ListUserComponent } from './components/users/index';
import { ListEntitieComponent } from './components/master-entities';

const routes: Routes = [
   {
      path: '', component: LayoutComponent,
      children: [
         { path: 'home', component: HomeComponent },
         { path: 'users', component: ListUserComponent },
         { path: 'tablas-maestras', component: ListEntitieComponent }
      ]
   }
];


@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class LayoutRoutingModule { }
