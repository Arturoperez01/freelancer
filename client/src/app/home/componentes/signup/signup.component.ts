import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import { SecurityService } from '../../../_auth/services/security.service';
import SHA3 from 'sha3';
import { store } from '../../../_auth/current-user';
import { User } from '../../../_models/user';

@Component({
  selector: 'my-sign-up-form',
  template: `
  <form  [formGroup]="form" (ngSubmit)="submit()">
    
    <p class="h4 mb-4">Registro</p>
  
    <div class="md-form form-sm">
    <i class="fas fa-user prefix"></i>
    <input type="text" formControlName="username" class="form-control form-control-sm" mdbInput>
    <label>Su nombre de usuario</label>
    </div>

    <div class="md-form form-sm">
    <i class="fas fa-envelope prefix"></i>
    <input type="text" formControlName="email" class="form-control form-control-sm" mdbInput>
    <label>Su correo</label>
    </div>

    <div class="md-form form-sm">
    <i class="fas fa-lock prefix"></i>
    <input type="password" formControlName="password"  class="form-control form-control-sm" mdbInput>
    <label>Su contraseña</label>
    </div>

    <div class="md-form form-sm">
    <i class="fas fa-lock prefix"></i>
    <input type="password" formControlName="repeatPassword" class="form-control form-control-sm" mdbInput>
    <label>Repita la contraseña</label>
    </div>

    <div class="text-center form-sm mt-2">
    <button class="btn btn-primary">Registrarse <i class="fas fa-sign-in ml-1"></i></button>
    </div>
  </form>
  `,

})
/*
type User = {
  name: string;
  email: string;
  password: string;
};
//*/
export class SignupFormComponent {
    @Input() error: string | null;
  
    @Output() submitEM = new EventEmitter<any>();
  
    form: FormGroup = new FormGroup({
      username: new FormControl('',[formValidator.required]),
      email: new FormControl('',[formValidator.required]),
      password: new FormControl('',[formValidator.required]),
      repeatPassword: new FormControl('',[formValidator.required,formValidator.equalVal]),
    });//*/
    constructor(
      private securityService: SecurityService
    ) {
    }
    submit() {
        
      if (this.form.valid) {
        const hash = new SHA3(512);
        hash.update(this.form.value.password);

        const sha3pass = hash.digest('hex');
        this.form.controls['password'].setValue( sha3pass)
        
        this.securityService.register(this.form.value).subscribe(data=>{
          this.setUser(data);
          this.submitEM.emit(data);
        },error=>{
          this.submitEM.emit(error);
        });
        //*/
        //console.log(this.form.value)
      }
    }
    
    private setUser(user: User) {
      store.setUser(user);
    }
  }

  export class formValidator extends Validators {
    static equalVal() {
      return (c: AbstractControl) => {
          
        const password = c.value.password;
        const passwordRepeated = c.value.passwordRepeated;

        if (!password || !passwordRepeated) return null;
        return password==passwordRepeated ? null : { notEqual: true };
      }
    }

  }
  /*
export default class SignupController {
  user: User = {
    name: '',
    email: '',
    password: ''
  };

  errors = {};
  submitted = false;
  Auth;
  $location;

  constructor(Auth, $location) {
    this.Auth = Auth;
    this.$location = $location;
  }

  register(form) {
    this.submitted = true;

    if(form.$valid) {
      return this.Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          // Account created, redirect to home
          this.$location.path('/');
        })
        .catch(err => {
          err = err.data;
          this.errors = {};
          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });
    }
  }
}
//*/