import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionStorage } from '../shared/session-storage.class';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {

   constructor(
      private router: Router,
   ) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const sessionActive = SessionStorage.getItem(environment.keySessionStorage);
      if (sessionActive && sessionActive.token) { return true; }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
   }
}