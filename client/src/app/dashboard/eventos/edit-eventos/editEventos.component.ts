
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit, Injectable } from '@angular/core';
import { Eventos } from '../../../_models/eventos/eventos';
import { Turno } from '../../../_models/eventos/turno';
import { EventoService } from '../../../_services/evento.service';
import { InscripcionService } from '../../../_services/inscripcion.service'
//import { AuthenticationService } from 'src/app/security/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
//import { SHA3 } from 'sha3';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
//import { UserConfig } from '../../../_models/user/index';
import { DynamicFormComponent } from '../../../_directives/dynamic-form/dynamic-form.component';
import { EventoFormService , formValidator} from "../eventoForm.service";
import { FormGroup, FormArray } from '@angular/forms';
const options = {
    fecha:'',
    horaini:'',
    horafin:'',
    cupo:''
}
@Component({
    selector: 'editEventos',
    templateUrl: './editEventos.component.html',
    styleUrls: ['./editEventos.component.scss'],
    providers:[EventoFormService]
})

export class  EditEventosComponent implements OnInit {

    id;
    options;
    title = "Agregar evento";
    showError: boolean;
    today;
    horas: any = [];
    servicios;
    inscripcion;
    loading;
    getToday(){
        
        let date = new Date();
        let d    = date.getDate();
        let m    = date.getMonth()+1; 
        let y    = date.getFullYear();
        
        let today = y.toString();


        if(m<10){
            today+='-0'+m;
        }else{
            today+='-'+m;
        } 
        if(d<10){
            today+='-0'+d;
        }else{
            today+='-'+d;
        } 
        return today;
    }
    
    //*/
    constructor(
        private eventoService: EventoService,
        private eventoFormService: EventoFormService,
        private location: Location,
        private inscripcionService: InscripcionService,
        //private user: EventosConfig,
        //private authenticationService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute
    ){ 
        //console.log(this.form.controls['details']['controls']['limite'])
        this.today =this.getToday();
        /*                     Generar Horas                         */
        let i = 0;
        //this.horas.push({op: i,hora: '00:00'});
        do
        {

            this.horas.push({op: i,hora: i>9?i+':00' : '0'+i+':00'});
            i++;
        }
        while(this.horas.length!=25)
        /*                     fin Generar Horas                      */
        
        this.eventoFormService.getServicios().subscribe( data =>{
            this.servicios = data;
            }
        )
        /*
        this.options = this.eventoFormService.fb.group({
                //'fechaInicio':['',[formValidator.required]],
                'fecha':['',[formValidator.required]],
                'horaIni':['',[formValidator.required]],
                'horaFin':['',[formValidator.required]],
                'cupo':['',[formValidator.required]]
            }, {validator: formValidator.compose([formValidator.minVal(),formValidator.equalVal()])}
        );
        //*/
        //this.options = new Turno(null, null, null, null, null)
    }
    
    get form(): FormGroup {
        return this.eventoFormService.form;
    }

    ngOnInit(): void {
        //this.eventos.setValues({_id:'id',mail:'som@lia.com',name:'nombre',roles: ['USER'],password:'contra', username:"usuario"});
        //this.config = this.user.config()
        //console.log(this.form)
        this.route.params.subscribe(params => {
            //console.log(params);
            this.id = params.id;
            this.inscripcionService.getByIdEvento(this.id).subscribe( data =>{
                this.inscripcion = data;
                console.log(data);
                }
            )
            if (this.id === 'new') {
                // New User
                //this.eventos = new Eventos(null, null, null,[],[]);
                this.loading=false;
            } else {
                this.eventoFormService.getEvento(this.id);
                // Get User
                //console.log(this.config.map(a=>a));
                //this.eventoService.getById(params.id).subscribe(eventos => this.eventos = eventos);
            }
            //*/
        });
    }

    /**
     * Save or create User
     */
    save() {
        
        if (this.form.controls['details'].valid||this.form.value.turnos.length  == 0) {
            
          let data = this.form.controls['details'].value;
          data.turnos =  this.form.controls['turnos'].value
          if (data._id) {
              // Save
              this.eventoService.update(data).subscribe(data => this.router.navigateByUrl('/dashboard/eventos'));
          } else {
              // Create
              //const hash = new SHA3(512);

              //hash.update(this.user.password);
              //this.user.password = hash.digest('hex');
              this.eventoService.register(data).subscribe(data => this.router.navigateByUrl('/dashboard/eventos'));
              
          }
        }
        /*
        //*/
    }

    goBack() {
        this.location.back(); 
    }

    onAddDetalle(): void {
        
      
      let options  = this.form.controls['options'].value;
        
      const control = (<FormArray>this.form.controls['turnos']);
      
      control.push(this.eventoFormService.crearDetalle(options.horaIni, options.horaFin, options.cupo, options.fecha ));    

      this.form.controls['options'].reset();
      /*console.log(this.form.controls['options']);
        /*
        if (detalle.value) {
            this.user.Turno.push(detalle.value);
            detalle.value = '';
        }
        //*/
    }

    /**
     * Remove role from user
     *
     * @param {number} index Index of the role in the array
     */
    removeDetalle(index: number) {
        
        //this.form.controls['turno'].controls.splice(index, 1);
    }


    trackByFn(index: number, item: any) {
        return index;
    }
    
    onAddPerfil(perfil){
        if (perfil.value) {
            //this.user.perfiles.push(perfil.value.toUpperCase());
            this.form.controls['details']['controls']['perfiles'].value.push(perfil.value.toUpperCase());
            perfil.value = '';
        }
    };
    onPerfilRemove() {

    }
}
