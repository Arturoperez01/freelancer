import { Component, OnInit }        from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { ViewChild } from '@angular/core';
import { AlertService } from 'src/app/_services';
//import { RolesConfig } from '../../_models/roles/roles-config'
import { EventoService } from 'src/app/_services/evento.service';

@Component({
  selector: 'app-miseventospage',
  templateUrl: './miseventospage.component.html'
  //,styleUrls: ['./eventos.component.scss']
})

export class MisEventosPageComponent {
  loading = true;
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
          console.log(data);
          this.eventos = data;
          this.loading = false;
        },
        error => {
         // console.log(error);
            this.alertService.error(error);
        });
    //*/

  }
}
