import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** cpomponets */
import { NotFoundComponent } from './shared/not-found';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
   {
      path: '',
      loadChildren: './layout/layout.module#LayoutModule'
   },
   { path: 'login', component: LoginComponent },

   { path: '**', component: NotFoundComponent }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
