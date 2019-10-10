
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
  selector: 'app-misinscripcion',
  templateUrl: 'misinscripcionespage.component.html'
  //,styleUrls: ['./eventos.component.scss']
})
export class MisInscripcionesPageComponent {
    
    inscripciones: any =[];
    user; 
    
    constructor(  
                  private inscripcionService: InscripcionService,
                  private authenticationService: AuthenticationService,
                  private alertService: AlertService,
                  private eventoService: EventoService,
                  private router: Router,
                  private route: ActivatedRoute,
                  //private user: store
                ) {
            
      this.getData();
      
    }

    getData(){
      console.log(this.user);
      /*
      this.inscripcionService.getByIdUser(this.user._id)
      .subscribe(
        datainscripcion=>{
          this.inscripciones = datainscripcion.map(a=>a);
          
        });//*/
    }
}