import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** guards */
import { AdminGuard, SuperadminGuard } from '../guards/index';

/** components */
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home';
import { ListUserComponent } from './components/users/index';
import { ListEntitieComponent } from './components/master-entities';
import { ListFieldComponent } from './components/fields/index';
import { ListClientComponent } from './components/clients/index';

const routes: Routes = [
   {
      path: '', component: LayoutComponent,
      children: [
         { path: 'home', component: HomeComponent },
         { path: 'users', component: ListUserComponent, canActivate: [AdminGuard] },
         { path: 'tablas-maestras', component: ListEntitieComponent, canActivate: [SuperadminGuard] },
         { path: 'canchas', component: ListFieldComponent },
         { path: 'clientes', component: ListClientComponent }
      ]
   }
];


@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class LayoutRoutingModule { }
