import { RolesBase } from "./roles.base";

import { Validators } from '@angular/forms';
import { FieldConfig } from "../../_directives/dynamic-form/models/field-config.interface";

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

export class RolesConfig  {
  //get config() { return config.filter(({type}) => type !== 'button'); }

  roles;

    constructor(
      ){
        this.roles = config;
      }
  
  setValues(roles: RolesBase){
    Object.keys(roles).forEach(keys=>
                              this.roles=config.filter(
                                        (rolesConfig)=>{
                                          if(keys==rolesConfig.name){
                                            rolesConfig.value = roles[keys]
                                          }
                                          return roles
                                        }
                                    )
                              )
    }

    config(){
      return this.roles;
    }
  }
