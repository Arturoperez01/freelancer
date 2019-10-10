import { ServicioBase } from "./servicio.base";

import { Validators } from '@angular/forms';
import {FieldConfig} from "../../_directives/dynamic-form/models/field-config.interface";

//Campos necesarios
const config: FieldConfig[] = [
    
  {
    type: 'input',
    label: 'Nombre completo',
    name: 'nombre',
    placeholder: 'Introduzca el nombre',
    validation: [Validators.required]
  },
  {
    label: 'Submit',
    name: 'submit',
    type: 'button'
  },
];

export class ServicioConfig  {
  //get config() { return config.filter(({type}) => type !== 'button'); }

  servicio;

    constructor(
      ){
        this.servicio = config;
      }
  
    setValues(servicio: ServicioBase){
        Object.keys(servicio).forEach(keys=>
                              this.servicio=config.filter(
                                        (servicioConfig)=>{
                                          if(keys==servicioConfig.name){
                                            servicioConfig.value = servicio[keys]
                                          }
                                          return servicio
                                        }
                                    )
                              )
    }

    config(){
      return this.servicio;
    }
  }
