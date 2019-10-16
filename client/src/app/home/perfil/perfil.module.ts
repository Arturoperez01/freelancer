import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { PerfilRoutingModule } from './perfil-routing.module';
import { SharedModule } from '../../shared.module';
import { PerfilComponent } from './perfil.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { InscripcionService } from '../../_services/inscripcion.service';
import { EventoService } from '../../_services/evento.service';


@NgModule({
  imports: [
    CommonModule,
    PerfilRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [
    PerfilComponent
  ],
  //providers:[InscripcionService,EventoService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PerfilModule { }