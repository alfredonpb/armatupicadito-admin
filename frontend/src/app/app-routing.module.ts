import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** components */
import { NotFoundComponent } from './shared/not-found';
import { LoginComponent } from './login/login.component';

/** guards */
import { AuthGuard } from './guards/index';

const routes: Routes = [
   {
      path: '',
      loadChildren: './layout/layout.module#LayoutModule',
      canActivate: [AuthGuard]
   },
   { path: 'login', component: LoginComponent },

   // otherwise redirect to not found page
   { path: '**', component: NotFoundComponent }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
