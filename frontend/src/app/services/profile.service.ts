import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CustomHeaders } from './custom-headers';  

@Injectable()
export class ProfileService {
   apiUrl = `${environment.apiUrl}/profiles`;

   constructor(
      private http: HttpClient,
   ) { }

   /** get by filters */
   getAll(): Observable<any> {
      return this.http.get(`${this.apiUrl}/get-all`, CustomHeaders.jwt());
   }

   /** delete */
   delete(id: number) {
      return this.http.delete(`${this.apiUrl}/delete/${id}`, CustomHeaders.jwt());
   }

}