import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CustomHeaders } from './custom-headers';  

@Injectable()
export class UserService {
   apiUrl = `${environment.apiUrl}/users`;

   constructor(
      private http: HttpClient,
   ) { }

   /** get by filters */
   getByFilters(filter: any): Observable<any> {
      return this.http.get(`${this.apiUrl}/get-by-filters`, CustomHeaders.jwt());
   }

}