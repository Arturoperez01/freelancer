import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginPageRoutingModule } from './loginPage-routing.module';
import { SharedModule } from '../../shared.module';
import { LoginPageComponent } from './loginPage.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
//import { Loginervice } from '../../_services/evento.service';

@NgModule({
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    FormsModule,
    SharedModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [
    LoginPageComponent
  ],
  //providers:[loginervice],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class loginPageModule { }