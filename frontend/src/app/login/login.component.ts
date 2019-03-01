import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../shared/alert.service';
import { SessionStorageClass } from '../shared/session-storage/index';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';
import * as $ from 'jquery';

@Component({
   selector: 'login',
   templateUrl: 'login.html'
})

export class LoginComponent implements OnInit, OnDestroy {
   form: FormGroup;
   loaderButton: boolean = false;
   
   constructor(
      private router: Router,
      private authService: AuthService,
      private fb: FormBuilder,
      private alertService: AlertService
   ) { }
   
   /** init component */
   ngOnInit() { 
      $('#page-top').addClass('bg-gradient-primary');
      this.createForm();
      this.authService.logout();
   }

   /** destroy component */
   ngOnDestroy() { 
      $('#page-top').removeClass('bg-gradient-primary');
   }

   /** create login form */
   createForm() {
      this.form = this.fb.group({
         email: ['', Validators.compose([
            Validators.required,
            Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/im)
         ])],
         password: ['', Validators.compose([
            Validators.required,
         ])]
      });
   }

   /** buttom login */
   login(credentials: any) {
      if (this.form.valid) {
         this.loaderButton = true;
         this.authService.login(credentials).subscribe(
            (data) => {
               this.router.navigate(['/home']);
               SessionStorageClass.setItem(environment.keySessionStorage, data.data);
               this.loaderButton = false;
            },
            (error) => {
               this.alertService.showMessageServer(error);
               this.loaderButton = false;
            }
         );
      } else {
         this.alertService.showMessage('Formulario', 'Los campos son requeridos', 'error');
      }
   }

}