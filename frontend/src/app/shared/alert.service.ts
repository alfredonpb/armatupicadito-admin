import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AlertService {
   optionsToastr: any = {
      timeOut: 7000,
      closeButton: true,
      positionClass: 'toast-top-center',
      tapToDismiss: false,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
   };

   constructor(
      private router: Router,
      private toastr: ToastrService
   ) {
   }

   /** mensajes de alerta */
   showMessage(title: string, message: string, type: string): void {
      if (type === 'success') { this.toastr.success(message, title, this.optionsToastr); }
      if (type === 'info') { this.toastr.info(message, title, this.optionsToastr); }
      if (type === 'warning') { this.toastr.warning(message, title, this.optionsToastr); }
      if (type === 'error') { this.toastr.error(message, title, this.optionsToastr); }
   }

   /** mensajes de alerta de server */
   showMessageServer(error: any): void {
      this.toastr.error(error.error.error, 'Error', this.optionsToastr);
      if (error.status === 401) { this.router.navigate(['/login']); }
   }

}
