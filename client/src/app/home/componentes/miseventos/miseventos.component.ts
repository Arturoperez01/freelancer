import { Component, OnInit }        from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { ViewChild } from '@angular/core';
import { AlertService } from 'src/app/_services';
//import { RolesConfig } from '../../_models/roles/roles-config'
import { EventoService } from 'src/app/_services/evento.service';

@Component({
  selector: 'app-miseventos',
  template: `
  <mdb-card class="rounded" cascade="true" narrower="true">
  
      <div class="view view-cascade overlay blue-gradient lighten-1">
              <h4 class="card-header-title pt-3 px-3"><strong>Eventos Disponibles</strong></h4>
              <p class="px-3">Todos los Eventos nuevos disponibles:</p>
      </div>
      
      <mdb-card-body cascade="true" class="text-center">
              
              <h1 class="p-3 mb-5 mt-5" *ngIf="eventos.length==0">
                  No existen entradas en la base de datos
              </h1>
              <table *ngIf="eventos.length!=0" mdbTable>
                  <thead>
                      <tr>
                          <th>Name</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr mdbTableCol *ngFor="let evento of eventos">
                      <td>{{evento.titulo}}</td>
                      <td><a class="round btn-sm success-color" [routerLink]="[ '/home/inscripcion',evento._id]" ><i class="fa-eye fas"></i></a></td>
                      </tr>
                  </tbody>
              </table>
      </mdb-card-body>
  </mdb-card>`
  //,styleUrls: ['./eventos.component.scss']
})

export class MisEventosComponent {
    
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
}
