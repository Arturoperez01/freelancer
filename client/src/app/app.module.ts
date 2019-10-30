import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { AuthenticationService } from './_auth/authentication.service';
import {RolesService,ServicioService} from './_services'
import { SharedModule } from './shared.module';
import { LoginPageComponent } from "./dashboard/loginPage/loginPage.component";

import { AuthGuard, AuthInterceptor, AuthenticationService, SecurityService }  from  './_auth'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    //...APP_MODULE_IMPORTS,
    //MaterialModule,
    
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,    
    AppRoutingModule,
    FormsModule
  ],
  providers: [RolesService,ServicioService,
    // SECURITY
    /*
    AuthGuard,
    AuthenticationService,
    SecurityService//*/
    ],
  exports: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class AppModule { }
