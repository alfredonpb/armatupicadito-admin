import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/index';
import { CustomHeaders } from './custom-headers';  
import { environment } from '../../environments/environment';

@Injectable()
export class ClientService {
   apiUrl = `${environment.apiUrl}/clients`;

   constructor(
      private http: HttpClient,
   ) { }

   /** get by filters */
   getByFilter(filter: any): Observable<any> {
      const customRequest = CustomHeaders.jwt();

      const params = customRequest.params
         .append('search', filter.search)
         .append('enabled', filter.enabled)
         .append('page', filter.page);

      const options = { headers: customRequest.headers, params: params };

      return this.http.get(`${this.apiUrl}/get-by-filter`, options);
   }

   /** create Client */
   create(values: Client) {
      return this.http.post(`${this.apiUrl}/create`, values, CustomHeaders.jwt());
   }

   /** update Client */
   update(values: Client, id: number) {
      return this.http.put(`${this.apiUrl}/update/${id}`, values, CustomHeaders.jwt());
   }

}