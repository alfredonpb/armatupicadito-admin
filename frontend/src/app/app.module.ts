import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { AlertService } from './shared/alert.service';

@NgModule({
   declarations: [
      AppComponent,
      NotFoundComponent,
      LoginComponent
   ],
   imports: [
      HttpClientModule,
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      ToastrModule.forRoot()
   ],
   providers: [
      AlertService,
      {
         provide: LocationStrategy,
         useClass: HashLocationStrategy
      },
      {
         provide: APP_BASE_HREF,
         useValue: environment.baseUrl
      },
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
