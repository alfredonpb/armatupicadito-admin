import { HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SessionStorageClass } from '../shared/session-storage';

export class CustomHeaders {

   public static jwt() {
      const currentUser = SessionStorageClass.getItem(environment.keySessionStorage);
      let headers: HttpHeaders; // instancio el objecto cabeceras

      // si existe un usuario en local storage y su token
      if (currentUser) {
         headers = new HttpHeaders(
            { 'Content-Type': 'application/json', 'Authorization': currentUser.token }
         ); // creo el header con el token
      }

      return { headers };

   }

}
