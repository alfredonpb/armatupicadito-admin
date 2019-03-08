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
   getByFilter(filter: any): Observable<any> {
      const customRequest = CustomHeaders.jwt();

      const params = customRequest.params
         .append('search', filter.search)
         .append('profile', filter.profile)
         .append('enabled', filter.enabled)
         .append('page', filter.page);

      const options = { headers: customRequest.headers, params: params };

      return this.http.get(`${this.apiUrl}/get-by-filters`, options);
   }

}