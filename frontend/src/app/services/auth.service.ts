import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
   apiUrl = `${environment.apiUrl}/auth`;

   constructor(
      private http: HttpClient
   ) {
   }

   /** login */
   login(credentials: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`, credentials);
   }

}
