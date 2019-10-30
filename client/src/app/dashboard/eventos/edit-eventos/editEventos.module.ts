import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { EditEventosRoutingModule } from './editEventos-routing.module';
import { SharedModule } from '../../../shared.module';
import { EditEventosComponent } from './editEventos.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { EventoService } from '../../../_services/evento.service';
import { InscripcionService } from '../../../_services/inscripcion.service'
import { EventoFormService } from '../eventoForm.service';

@NgModule({
  imports: [
    CommonModule,
    EditEventosRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [
    EditEventosComponent
  ],
  providers:[EventoService,InscripcionService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditEventosModule { }