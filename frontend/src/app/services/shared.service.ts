import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CustomHeaders } from './custom-headers';  

@Injectable()
export class SharedService {
   apiUrl = `${environment.apiUrl}/shared`;

   constructor(
      private http: HttpClient,
   ) { }

   /** create entities */
   createEntitie(values: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/create-entitie`, values, CustomHeaders.jwt());
   }

}