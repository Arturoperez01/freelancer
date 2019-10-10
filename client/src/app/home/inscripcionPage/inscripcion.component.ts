
import { Component, OnInit }        from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { Inscripcion } from '../../_models/inscripcion/inscripcion';

import { store } from '../../_auth/current-user';
import { ViewChild } from '@angular/core';
import { AlertService } from 'src/app/_services';
import { EventoService } from 'src/app/_services/evento.service';
import { InscripcionService } from 'src/app/_services/inscripcion.service';
import { AuthenticationService } from 'src/app/_auth';
//import { RolesConfig } from '../../_models/roles/roles-config'

@Component({
  selector: 'app-inscripcion',
  templateUrl: 'inscripcion.component.html'
  //,styleUrls: ['./eventos.component.scss']
})
export class InscripcionComponent {
    
    inscripciones: any =[];
    turnos: any = [];
    idEvento;
    user; 
    constructor(  
                  private inscripcionService: InscripcionService,
                  private authenticationService: AuthenticationService,
                  private alertService: AlertService,
                  private eventoService: EventoService,
                  private router: Router,
                  private route: ActivatedRoute
                ) {
            
      this.getData();
      
    }
  
    addInscripcion(data){
      const inscripcion = new Inscripcion(null, this.user._id, data, this.idEvento,0, 0);
      this.inscripcionService.register(inscripcion).subscribe(data=>{this.alertService.success("Inscripcion exitosa")})
      this.getData();
    }

    removeInscripcion(id){
      this.inscripcionService.delete(this.inscripciones[id].id).subscribe(data=>{this.alertService.success("Inscripcion exitosa")});
      this.getData();
    }
    getData(){
      
      this.authenticationService.getUser().subscribe(user => {
        this.user = user;
        //console.log(this.user);
      }, err => this.user = null);
      //store.currentUser$.subscribe( user => this.user = user);
      //This.inscripcionService.getAll()
        this.route.params.subscribe(params => {
            //console.log(params);
            this.idEvento = params.id;
            
            this.eventoService.getById(this.idEvento)
            .subscribe(
                dataevento => {
                    //console.log(data);
                    
                    this.inscripcionService.getByIdUser(this.user._id)
                    .subscribe(
                      datainscripcion=>{
                        this.turnos = dataevento.turnos.filter(a=>!datainscripcion.find(turno=>turno.idTurno['_id']==a._id));
                        this.inscripciones = [];
                        dataevento.turnos.forEach(a=>{
                                                      
                                                      const turno = datainscripcion.find(turno=>turno.idTurno['_id']==a._id);
                                                      if( turno !== undefined){
                                                        this.inscripciones.push({
                                                          fecha: a.fecha,
                                                          horaIni: a.horaIni,
                                                          horaFin: a.horaFin,
                                                          id: turno._id
                                                        });
                                                      }
                                                    }
                                                );
    
                        //console.log(datainscripcion.filter(a=>dataevento.turno.find(b=>b._id==a.idTurno)));
                      });
                },
                error => {
                // console.log(error);
                    this.alertService.error(error);
                });
        })
          
    }
  }
  
  //*/