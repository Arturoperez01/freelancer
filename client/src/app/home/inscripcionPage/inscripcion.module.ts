import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { InscripcionRoutingModule } from './inscripcion-routing.module';
import { SharedModule } from '../../shared.module';
import { InscripcionComponent } from './inscripcion.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { InscripcionService } from '../../_services/inscripcion.service';
import { EventoService } from '../../_services/evento.service';


@NgModule({
  imports: [
    CommonModule,
    InscripcionRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [
    InscripcionComponent
  ],
  providers:[InscripcionService,EventoService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InscripcionModule { }