import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Storage } from '../shared/storage.class';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {

   constructor(
      private router: Router,
   ) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const sessionActive = Storage.getItem(environment.keySessionStorage);
      if (sessionActive && sessionActive.token) { return true; }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
   }
}