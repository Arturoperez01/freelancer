import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'my-login-form',
  template: `
  <form  [formGroup]="form" (ngSubmit)="submit()">
  
    <p class="h4 mb-4">Sign in</p>
  
    <!-- Email -->
    <div class="form-group ">
    <label class="pull-left">Correo</label>
    <input type="email" id="defaultLoginFormEmail" formControlName="username"  class="form-control mb-4" placeholder="E-mail" >
    </div>
  
    <!-- Password -->
    <div class="form-group ">
    <label class="pull-left">Password</label>
    <input type="password" id="defaultLoginFormPassword" formControlName="password"  class="form-control mb-4" placeholder="Password" >
    </div>
  
    <div class="form-group ">
    <input type="checkbox" class="pull-right mt-8" formControlName="remember" name="remember">
    <label class="pull-right">Remember login&nbsp;</label>
    </div>
    <!-- Sign in button -->
    <button mdbBtn color="info" block="true" class="my-4" type="submit" >Sign in</button>
  </form>
  `,

})
export class LoginFormComponent {
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter<FormGroup>();

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    remember: new FormControl(''),
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