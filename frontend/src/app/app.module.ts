import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';

// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// environment
import { environment } from '../environments/environment';

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule
   ],
   providers: [
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
