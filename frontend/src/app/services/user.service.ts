import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/index';
import { CustomHeaders } from './custom-headers';  
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
   apiUrl = `${environment.apiUrl}/users`;

   constructor(
      private http: HttpClient,
   ) { }

   /** get by filters */
   getByFilter(filter: any): Observable<any> {
      const customRequest = CustomHeaders.jwt();

      const params = customRequest.params
         .append('search', filter.search)
         .append('profile', filter.profile)
         .append('enabled', filter.enabled)
         .append('page', filter.page);

      const options = { headers: customRequest.headers, params: params };

      return this.http.get(`${this.apiUrl}/get-by-filter`, options);
   }

   /** create user */
   create(values: User) {
      return this.http.post(`${this.apiUrl}/register`, values, CustomHeaders.jwt());
   }

   /** update user */
   update(values: User, id: number) {
      return this.http.put(`${this.apiUrl}/update/${id}`, values, CustomHeaders.jwt());
   }

}