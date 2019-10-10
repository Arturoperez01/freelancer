import { UserBase } from "./user.base";
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import {FieldConfig} from "../../_directives/dynamic-form/models/field-config.interface";
import { HttpClient } from '@angular/common/http';
import { Servicio } from '../servicio/servicio';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Roles } from '../roles/roles';
import { environment } from 'src/environments/environment';


//Campos necesarios
const config: FieldConfig[] = [
  {
    type: 'input',
    label: 'Nombre del usuario',
    name: 'username',
    placeholder: 'Introduzca el nombre',
    validation: [Validators.required]
  },
  {
    type: 'input',
    label: 'Nombre completo',
    name: 'name',
    placeholder: 'Introduzca el nombre',
    validation: [Validators.required]
  },
  {
    type: 'input',
    label: 'Correo electronico',
    name: 'mail',
    placeholder: 'Introduzca correo',
    validation: [Validators.required,Validators.email]
  },
  {
    type: 'password',
    label: 'contraseña',
    name: 'password',
    placeholder: 'Introduzca contraseña',
    validation: [Validators.required, Validators.minLength(8), Validators.maxLength(8)]
  },
  {
    type: 'multiselect',
    label: 'Tipo de usuario',
    name: 'roles',
    options: [],
    placeholder: 'Escoja el tipo de usuario',
    validation: [Validators.required],
    value: []
  },
  {
    type: 'multiselect',
    label: 'Servicios',
    name: 'servicios',
    placeholder: 'Escoja un servicio para el usuario',
    validation: [Validators.required],
    value: ['NewService']
  },
  {
    type: 'tags',
    label: 'Perfiles',
    name: 'perfiles',
    placeholder: 'Escoja un perfil para el usuario',
    validation: [Validators.required],
    value: ['servicio1','servicio2']
  },
  {
    label: 'Submit',
    name: 'submit',
    type: 'button'
  },
];

@Injectable()
export class UserConfig  {
  //get config() { return config.filter(({type}) => type !== 'button'); }

  contextUrl = environment.endpoint;
  user;
  roles;
  servicio;
    constructor(
        private http: HttpClient
      ){
        this.user = config;
        this.getServicios();
        this.getRoles();
        console.log(this.user)
      }
  
  private getServicios(): void {  
    this.http.get<Servicio[]>(`${this.contextUrl}`+'/servicio')
    .subscribe(data => {
      this.user=config.filter(
        (userConfig)=>{
          if("servicios"==userConfig.name){
            userConfig.options = data.map((a,i)=>{return {key: a["nombre"], name:a["nombre"]}});
            userConfig.value   = userConfig.options.map(a=>a.name);
            console.log(userConfig.value);
          }
          return userConfig
        }
    )
    });
  };
  
  private getRoles(): void{
    this.http.get<Roles[]>(`${this.contextUrl}`+'/roles')
    .subscribe(data => {
      this.user=config.filter(
          (userConfig)=>{
            if("roles"==userConfig.name){
              userConfig.options = data.map((a,i)=>{return {key: a["name"], name:a["name"]}});
              userConfig.value   = userConfig.options.map(a=>a.name);
            }
            return userConfig
          }
      )
    });
  };    

  //setValues(user: UserBase){
  setValues({...user}){
    Object.keys(user).forEach(key=>
                              this.user=config.filter(
                                        (userConfig)=>{
                                          if(key==userConfig.name){
                                            userConfig.value = user[key];
                                            return userConfig.value
                                          }
                                        }
                                    )
                              )
    }

    config(){
      return this.user;
    }
  }
