import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { SessionStorageClass } from '../shared/session-storage/index';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
   apiUrl = `${environment.apiUrl}/auth`;

   constructor(
      private http: HttpClient,
      private router: Router,
   ) {
   }

   /** login */
   login(credentials: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`, credentials);
   }

   /** logout */
   logout() {
      SessionStorageClass.remoteItem(environment.keySessionStorage);
      this.router.navigate(['/login']);
   }

}
