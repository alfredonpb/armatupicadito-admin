import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionStorageClass } from '../shared/session-storage/index';
import { environment } from '../../environments/environment';

@Injectable()
export class AdminGuard implements CanActivate {

   constructor(
      private router: Router,
   ) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const sessionActive = SessionStorageClass.getItem(environment.keySessionStorage);
      if (sessionActive.profile && (sessionActive.profile.name === 'Superadmin' || sessionActive.profile.name === 'Administrador')) { return true; }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/home']);
      return false;
   }
}