import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** modules */
import { SharedModule } from './shared/shared.module';

/** plugins */
import { ToastrModule } from 'ngx-toastr';

/** componenetes */
import { NotFoundComponent } from './shared/not-found';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

/** env */
import { environment } from '../environments/environment';

/** services */
import { AuthService } from './services/auth.service';
import { AlertService } from './shared/alert.service';

/** guards */
import { AuthGuard } from './guards/index';

// locale
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/es-AR';
import localeArExtra from '@angular/common/locales/extra/es-AR';

registerLocaleData(localeAr, 'es-Ar', localeArExtra);

@NgModule({
   declarations: [
      AppComponent,
      NotFoundComponent,
      LoginComponent
   ],
   imports: [
      SharedModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      ToastrModule.forRoot()
   ],
   providers: [
      AuthGuard,
      AuthService,
      AlertService,
      {
         provide: LocationStrategy,
         useClass: HashLocationStrategy
      },
      {
         provide: APP_BASE_HREF,
         useValue: environment.baseUrl
      },
      {
         provide: LOCALE_ID,
         useValue: 'es-AR'
      }
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
