import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Field } from '../models/index';
import { CustomHeaders } from './custom-headers';  
import { environment } from '../../environments/environment';

@Injectable()
export class FieldService {
   apiUrl = `${environment.apiUrl}/fields`;

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

   /** create Field */
   create(values: Field) {
      return this.http.post(`${this.apiUrl}/create`, values, CustomHeaders.jwt());
   }

   /** update Field */
   update(values: Field, id: number) {
      return this.http.put(`${this.apiUrl}/update/${id}`, values, CustomHeaders.jwt());
   }

}