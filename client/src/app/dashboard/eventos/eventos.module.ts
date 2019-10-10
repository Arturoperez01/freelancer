import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventosPageRoutingModule } from './eventos-routing.module';
import { SharedModule } from '../../shared.module';
import { EventosPageComponent } from './eventos.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { EventoService } from '../../_services/evento.service';

@NgModule({
  imports: [
    CommonModule,
    EventosPageRoutingModule,
    FormsModule,
    SharedModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [
    EventosPageComponent
  ],
  providers:[EventoService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventosModule { }