import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'my-sign-up-form',
  template: `
  <form  [formGroup]="form" (ngSubmit)="submit()">
  
    <div class="md-form form-sm">
    <i class="fas fa-user prefix"></i>
    <input type="text" id="form13" formControlName="username" class="form-control form-control-sm" mdbInput>
    <label for="form13">Your name</label>
    </div>

    <div class="md-form form-sm">
    <i class="fas fa-envelope prefix"></i>
    <input type="text" id="form12" formControlName="email" class="form-control form-control-sm" mdbInput>
    <label for="form12">Your email</label>
    </div>

    <div class="md-form form-sm">
    <i class="fas fa-lock prefix"></i>
    <input type="password" id="form14" formControlName="password"  class="form-control form-control-sm" mdbInput>
    <label for="form14">Your password</label>
    </div>

    <div class="md-form form-sm">
    <i class="fas fa-lock prefix"></i>
    <input type="password" id="form15" class="form-control form-control-sm" mdbInput>
    <label for="form15">Repeat password</label>
    </div>

    <div class="text-center form-sm mt-2">
    <button class="btn btn-primary">Sign up <i class="fas fa-sign-in ml-1"></i></button>
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
  
    @Output() submitEM = new EventEmitter<FormGroup>();
  
    form: FormGroup = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });//*/
    constructor() {
    }
    submit() {
      if (this.form.valid) {
        //console.log(this.form.value)
        this.submitEM.emit(this.form.value);
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