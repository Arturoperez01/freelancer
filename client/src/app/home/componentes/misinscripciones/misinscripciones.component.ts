
import { Component, OnInit }        from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { Inscripcion } from '../../../_models/inscripcion/inscripcion';

import { store } from '../../../_auth/current-user';
import { ViewChild } from '@angular/core';
import { AlertService } from 'src/app/_services';
import { EventoService } from 'src/app/_services/evento.service';
import { InscripcionService } from 'src/app/_services/inscripcion.service';
import { AuthenticationService } from 'src/app/_auth';
//import { RolesConfig } from '../../_models/roles/roles-config'

@Component({
  selector: 'app-misinscripciones',
  template: `
  <mdb-card class="rounded" cascade="true" narrower="true">
  
  <div class="view view-cascade overlay blue-gradient lighten-1">
          <h4 class="card-header-title pt-3 px-3"><strong>Inscripciones Disponibles</strong></h4>
          <p class="px-3">Todos los Inscripciones nuevos disponibles:</p>
  </div>
  
  <mdb-card-body cascade="true" class="text-center">
          
          <h1 class="p-3 mb-5 mt-5" *ngIf="inscripciones.length==0">
              No existen entradas en la base de datos
          </h1>
          
          <div class="row" *ngFor="let inscripcion of inscripciones">            
            <div class="col-md-4">{{inscripcion.idTurno.fecha | date:"dd/M/yyyy"}}</div>
            <div class="col-md-4">{{inscripcion.idEvento.titulo}}</div>
            <div class="col-md-4">de: {{inscripcion.idTurno.horaIni}} hasta: {{inscripcion.idTurno.horaFin}}</div>
          </div>
          <!--table *ngIf="inscripciones.length!=0" mdbTable>
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  <tr mdbTableCol *ngFor="let inscripcion of inscripciones">
                  </tr>
              </tbody>
          </table-->
  </mdb-card-body>
</mdb-card>`
  //,styleUrls: ['./eventos.component.scss']
})
export class MisInscripcionesComponent {
    
    inscripciones: any =[];
    user; 
    
    constructor(  
                  private inscripcionService: InscripcionService,
                  private authenticationService: AuthenticationService,
                  private alertService: AlertService,
                  private eventoService: EventoService,
                  private router: Router,
                  private route: ActivatedRoute
                ) {
      store.currentUser$.subscribe(user =>this.user = user);    
      console.log(this.user);
      this.eventoService.getUserEvent(this.user._id)
      .subscribe(data=>{
        console.log(data);
      });
      this.getData();

    }

    getData(){
        this.inscripcionService.getByIdUser(this.user._id).subscribe(data=>{
          this.inscripciones = data;
        })
    }
}