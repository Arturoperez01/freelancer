import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/Http';
import { LoginFormComponent } from './_auth/login/login-form.component'
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from './material.module';
import { AlertService, UserService } from './_services'
import { AuthGuard, AuthInterceptor, AuthenticationService, SecurityService }  from  './_auth'
import { AlertComponent } from './_directives'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DynamicFormModule } from './dynamic-form.module';
import { PageNotFoundComponent } from "./pagenotfound.component";

@NgModule({
 imports:      [ CommonModule,
                 ReactiveFormsModule,
                 HttpClientModule,
                 MaterialModule,
                 MDBBootstrapModule.forRoot() ],
 declarations: [  AlertComponent,
                  LoginFormComponent,
                  PageNotFoundComponent
                 ],
 providers:    [ 
                {
                provide : HTTP_INTERCEPTORS,
                useClass: AuthInterceptor,
                multi   : true,
                },
                AlertService,
                UserService/*,
                // SECURITY
                
                AuthGuard,
                AuthenticationService,
                SecurityService//*/ ],
 exports:      [ 
                 AlertComponent,
                 PageNotFoundComponent,
                 CommonModule, 
                 FormsModule,
                 MaterialModule,
                 LoginFormComponent
                  ]
})
export class SharedModule { }