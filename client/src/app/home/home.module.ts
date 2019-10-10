import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MisEventosComponent } from './componentes/miseventos/miseventos.component';
import { MisInscripcionesComponent } from './componentes/misinscripciones/misinscripciones.component'
import { IndexComponent } from './index/index.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SignupFormComponent } from './componentes/signup/signup.component';
import { SharedModule } from '../shared.module';
import { EventoService } from '../_services/evento.service';
import { InscripcionService } from '../_services/inscripcion.service';
import { LoginFormComponent } from '../_auth/login/login-form.component';
/*
import { AuthService } from '../auth/auth.service';
import { AuthGuard }                          from '../auth/auth.guard';
//*/
@NgModule({
  imports: [
    //...APP_MODULE_IMPORTS,
    //MaterialModule,
    SharedModule,
    MDBBootstrapModule.forRoot(),
    CommonModule,
    HomeRoutingModule,
    FormsModule,ReactiveFormsModule
  ],
  declarations: [
    HomeComponent,
    IndexComponent,
    SignupFormComponent,
    MisEventosComponent,
    MisInscripcionesComponent,
    LoginFormComponent
  ],
  providers: [EventoService, InscripcionService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class HomeModule {}
