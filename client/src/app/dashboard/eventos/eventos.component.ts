import { Component, OnInit }        from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { ViewChild } from '@angular/core';
import { AlertService } from 'src/app/_services';
//import { RolesConfig } from '../../_models/roles/roles-config'
import { DynamicFormComponent } from '../../_directives/dynamic-form/dynamic-form.component';
import { EventoService } from 'src/app/_services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})

export class EventosPageComponent {
    
  eventos=[];
  
  constructor(  
                private eventoService: EventoService,
                private alertService: AlertService
              ) {
          
    this.getEventos();
  }


  getEventos(){
    
    this.eventoService.getAll()
    .subscribe(
        data => {
          // console.log(data);
          this.eventos =data;
        },
        error => {
         // console.log(error);
            this.alertService.error(error);
        });
    //*/
  }
  deleteEventos(id) {
    
    this.eventoService.delete(id)
    .subscribe(
        data => {
          this.alertService.success("Eliminado Exitoso");
          this.getEventos();
        },
        error => {
            this.alertService.error(error);
        });
    //*/
  }
}
