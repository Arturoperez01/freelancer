import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import SHA3 from 'sha3';
import { store } from '../../../app/_auth/current-user';
import { User } from '../../_models/user/user';
import { SecurityService } from '../../_auth/services/security.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'my-login-form',
  template: `
  <form  [formGroup]="form" (ngSubmit)="submit()">
  
    <p class="h4 mb-4">Sign in </p>
  
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

  @Output() submitEM = new EventEmitter<any>();

  user: User = new User(null, null, null, null,null,null);
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    remember: new FormControl(''),
  });//*/
  constructor( //private securityService: SecurityService,
            private authenticationService: AuthenticationService) {
  }
  submit() {
    if (this.form.valid) {
        const hash = new SHA3(512);
        hash.update(this.form.value.password);

        const sha3pass = hash.digest('hex');
        this.authenticationService.login(this.form.value.username, sha3pass, this.form.value.remember)
        .subscribe(
            data => {
                this.setUser(data);   
                
                //this.submitEM.emit(this.authenticationService.isLoggedIn);
                this.submitEM.emit(data);
                //this.router.navigate([this.returnUrl]);
            },
            error => {
                //this.submitEM.emit(this.authenticationService.isLoggedIn);
                this.submitEM.emit(error);
                //console.log(error);
                //this.setMessage(error);
                //this.alertService.error(error);
                //this.loading = false;
            });
      //store.setUser(user);
    }
  }
  
  private setUser(user: User) {
      store.setUser(user);
  }
  //*/
}