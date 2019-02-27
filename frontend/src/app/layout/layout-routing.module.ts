import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { NotFoundComponent } from '../shared/not-found/index';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home';

const routes: Routes = [
   {
      path: '', component: LayoutComponent,
      children: [
         { path: 'home', component: HomeComponent }
      ]
   }
];


@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class LayoutRoutingModule { }
