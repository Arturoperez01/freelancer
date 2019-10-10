import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
//import { PreguntaFormValidatorsService } from './pregunta-form-validators.service';
import { ServicioService } from '../../_services/servicio.service';
import { RolesService} from '../../_services/roles.service';
import { EventoService } from 'src/app/_services/evento.service';

import { Servicio } from '../../_models/servicio/servicio';
import { Roles } from '../../_models/roles/roles'
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { AlertService } from 'src/app/_services';
//import { IExamenFormInterface, IRespuestaVOFEnum, IRespuestaSeleccionEnum, PreguntaTipoEnum, IRespuestaItem, IPreguntaItem } from './examen-form.interface';
//import { identifierModuleUrl } from '@angular/compiler';

//const GLOBAL =  require('./../../assets/cunix.json')
@Injectable()
export class EventoFormService {

    public form:  FormGroup;

    constructor(
        public fb: FormBuilder, 
        public servicioService: ServicioService,
        public rolesService: RolesService,
        public eventoService: EventoService,
        public alertService: AlertService 
        ) {   

        this.form = this.fb.group({
            
            'details': 
                            this.fb.group({
                                '_id': [null],
                                'servicio':['',[formValidator.required]],
                                'titulo':['',[formValidator.required]],
                                'limite':[1,[formValidator.required]],
                                'descripcion':['',[formValidator.required]],
                                'estado':['Activo'],
                                'perfiles':[[],formValidator.minLength(1)]
                            }),
            //'postulacionesEvento':[0,[formValidator.required]],
            
            'options': 
                            this.fb.group({
                                    //'fechaInicio':['',[formValidator.required]],
                                    //'_id':[],
                                    'fecha':['',[formValidator.required]],
                                    'horaIni':['',[formValidator.required]],
                                    'horaFin':['',[formValidator.required]],
                                    'cupo':['',[formValidator.required]]
                                }, {validator: formValidator.compose([formValidator.minVal(),formValidator.equalVal()])}
                            ),
            'turnos': this.fb.array([

                                    ]),

                }, {validator: formValidator.existDate()}  
            );//*/
    }
   
  
    getServicios() {  
        return this.servicioService.getAll();
    };
    
    getRoles() {
        return this.rolesService.getAll();
    };    
    
    getEvento(id){
        
    this.eventoService.getById(id).subscribe(evento => {
            if(evento){
                const control = (<FormArray>this.form.controls['turnos']);
                //this.loading=false;      
                
                let i = 0; 
                
                while(i!=evento.turnos.length)
                {            
                    i++;
                    control.push(this.crearDetalle());
                }
                //*/
                control.patchValue(evento.turnos);
                this.form.controls['details'].patchValue(evento);
                this.form.patchValue(evento);
                this.form.controls['details']['controls']['servicio'].disable();
                //*/
            }
       });   
    }

    crearDetalle(horaIni = 0, horaFin = 0, cupo = 0, fecha = 0, inscripciones =0, estado = 'activado') {
        return this.fb.group({
            '_id'         : [0],
            'fecha'      : [fecha, Validators.required],
            'horaIni'    : [horaIni, Validators.required], 
            'horaFin'    : [horaFin, Validators.required], 
            'cupo'       : [cupo, Validators.required], 
            'inscripciones' : [inscripciones, Validators.required], 
            'estado'     : [estado, Validators.required] 
        });
    }
    //*/
    
}


export class formValidator extends Validators {
    
    static equalVal() {
      return (c: AbstractControl) => {
          
          const ini = c.value.horaIni;
          const fin = c.value.horaFin;
  
          if (!ini || !fin) return null;
          return ini != fin ? null : { equalval: true };
        }
      }
  
      static minVal() {
      return (c: AbstractControl) => {
  
          const ini = c.value.horaIni;
          const fin = c.value.horaFin;
  
          if (!ini || !fin) return null;
          return ini <= fin ? null : { exmin: true };
        }
      }

      static existDate() { 
      return (c: AbstractControl) => {
          
              let i = 0;
              const options = c.value.options;
              const dateFilter = c.value.turnos.filter(f=>{
                    return f.fecha == options.fecha;
              });
              const date = dateFilter.find(
              
              (e)=>{
                  i++;
                  if(c.value.options.horaIni&&c.value.options.horaFin){
  
                      return (
                                  ((e.horaIni.split(":",1)>c.value.options.horaIni.split(":",1)&&
                                  e.horaIni.split(":",1)<c.value.options.horaFin.split(":",1))||
                                  (e.horaFin.split(":",1)>c.value.options.horaIni.split(":",1)&&
                                  e.horaFin.split(":",1)<c.value.options.horaFin.split(":",1)))||
                                  ((e.horaIni.split(":",1)<=c.value.options.horaIni.split(":",1)&&
                                  e.horaFin.split(":",1)>c.value.options.horaIni.split(":",1))||
                                  (e.horaIni.split(":",1)<c.value.options.horaFin.split(":",1)&&
                                  e.horaFin.split(":",1)>=c.value.options.horaFin.split(":",1)))
  
                              )
                      }
                  } 
              );
              
              return !date ? null : {existdate: true};
          }
      }
  }
  