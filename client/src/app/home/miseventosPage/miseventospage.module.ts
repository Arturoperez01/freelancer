import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { MisEventosPageRoutingModule } from './miseventospage-routing.module';
import { SharedModule } from '../../shared.module';
import { MisEventosPageComponent } from './miseventospage.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { EventoService } from '../../_services/evento.service';


@NgModule({
  imports: [
    CommonModule,
    MisEventosPageRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [
    MisEventosPageComponent
  ],
  providers:[EventoService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MisEventosPageModule { }