import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/_services';
import { UserFormService } from './UserForm.service';

//Todo: poder colocar multiples tags
@Component({
  selector: 'userform',
  //styleUrls: ['form-tags.component.scss'],
  template: `
  <form  [formGroup]="form" (ngSubmit)="submit()">
    <div class="row">
        
        <div class="form-group col-md-12">

          <!-- name -->
          <div class="md-form">
          <input mdbInput mdbValidate type="text" formControlName="email" class="form-control" >
          <label class="pull-left">Correo</label>
          </div>

          <!-- name -->
          <div class="md-form">
          <label class="pull-left">Nombre</label>
          <input mdbInput mdbValidate type="text" formControlName="name"  class="form-control" >
          </div>


          <div class="md-form ">
          <label class="pull-left">Nombre de usuario</label>
          <input mdbInput mdbValidate type="text" formControlName="username"  class="form-control">
          </div>
          
          <div class="md-form ">
          <mat-form-field >
            <mat-label>Servicios</mat-label>
            <mat-select formControlName="servicios"  multiple>
              <mat-option *ngFor="let servicio of servicios" [value]="servicio.nombre">
                {{ servicio.nombre }}
              </mat-option>
            </mat-select>
          </mat-form-field>
          </div>

          <div class="md-form ">
            <mat-form-field >
              <mat-label>Roles</mat-label>
              <mat-select formControlName="roles"  multiple>
                <mat-option *ngFor="let rol of roles" [value]="rol.name">
                  {{ rol.name }}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <!-- Password -->
          <div class="md-form ">
          <label class="pull-left">Contraseña</label>
          <input mdbInput mdbValidate type="password"  formControlName="password"  class="form-control mb-4" placeholder="Colocar contraseña" >
          </div>

        </div> 
        
      
        <div class="col-md-11" >
          <div class="md-form ">
          <label class="pull-left">Perfiles</label>
            <input 
            mdbInput
              type="text" class="form-control"  name="perfiles" #perfil>
          </div>
        </div>
        <div class="col-md-1" >
        <span class="round btn-sm primary-color float-right " (click)="onAddPerfil(perfil)">
            <i class="fa fa-plus"></i>
        </span>
        </div>
        <div class="col-md-12">
          <label class="text-left" *ngIf="!perfilesArray || perfilesArray.length==0; else empty">
          Sin perfil asignado
          </label>  
        </div>
      <!-- NO perfiles -->
        <ng-template #empty>
          <div formArrayName="perfiles" class="col-md-12">
            
            <div *ngFor="let perfil of perfilesArray.controls; let i=index" class="row"  [formGroup]="perfil">
              <!-- The repeated alias template -->
              <div class="col-md-11" >                
                <div class="md-form ">
                  <label class="pull-left">Perfil</label>
                  <input mdbInput type="text" [formControl]="perfil" class="form-control">
                </div>
              </div>
              <div class="col-md-1" >
                <span class="round btn-sm danger-color float-right" (click)="onPerfilRemove(i)"><i class="fa fa-trash"></i></span>
              </div>
            </div>
          </div>
      </ng-template>
      
      <div class="col-md-12">
        <button mdbBtn color="info" block="true" class="my-4" type="submit" >Sign in</button>
      </div>
    </div>
  </form>
  `,
})
export class UserFormComponent {
  
  //@Input() error: string | null;

  @Output() submitEM = new EventEmitter<FormGroup>();
  @Input()  data;
  servicios;
  roles;
  
  //form: FormGroup;
  //*/
  constructor(
    private fb: FormBuilder,
    private userFormService: UserFormService
    ){
      
      this.userFormService.getServicios().subscribe(response=>this.servicios=response);
      this.userFormService.getRoles().subscribe(response=>this.roles=response);        
    }
    
    //onSubmit(data) {    }
    
    get form(): FormGroup {
        //console.log("Este dentro de form: ",this.examenFormService);
        //console.log(this.userFormService)
        return this.userFormService.form;
    }
    //*/
    
    submit() {
      
      console.log(this.form.value)
      this.submitEM.emit(this.form.value);
      
      /*
        this.userService.register(value)
        .subscribe(
            data => {
            
            //this.alertService.success("Se agrego un nuevo usuario");
            },
            error => {
               // this.alertService.error("Error al agregar usuario");
            });
      //*/
    }
    //*/
    get perfilesArray(): FormArray {
      return this.form.get('perfiles') as FormArray;
    }
    
  
    onAddPerfil(perfil){
      this.perfilesArray.push(this.getservicioFormGroup(perfil.value));
    };
    
    getservicioFormGroup(perfil){
      return this.fb.control(
        perfil
      );
    }
    onPerfilRemove(index){
      this.perfilesArray.removeAt(index);
    };
}