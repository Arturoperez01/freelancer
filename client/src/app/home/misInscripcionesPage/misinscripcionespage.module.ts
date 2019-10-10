import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { MisInscripcionesPageRoutingModule } from './misinscripcionespage-routing.module';
import { SharedModule } from '../../shared.module';
import { MisInscripcionesPageComponent } from './misinscripcionespage.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { InscripcionService } from '../../_services/inscripcion.service';
import { EventoService } from '../../_services/evento.service';


@NgModule({
  imports: [
    CommonModule,
    MisInscripcionesPageRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [
    MisInscripcionesPageComponent
  ],
  providers:[InscripcionService,EventoService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MisInscripcionesPageModule { }