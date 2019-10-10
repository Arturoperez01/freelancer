import { Component }        from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SecurityService } from '../../_auth/services/security.service'
import { AlertService } from '../../_services';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../_auth/authentication.service';

import { SHA3 } from 'sha3';

@Component({
  selector: 'app-loginPage',
  templateUrl: './loginPage.component.html',
  styleUrls: ['./loginPage.component.scss'],
  providers: [ SecurityService, AuthenticationService ]
})
export class LoginPageComponent {
  message: string;
  login;
  loading = false;
  submitted = false;
  returnUrl: string;
  
  constructor(
                private route: ActivatedRoute,
                private router: Router,
                private securityService: SecurityService,
                private authenticationService: AuthenticationService,
                private alertService: AlertService
              ) {
    //this.setMessage();
    //$(".loader").fadeOut("slow");
    //this.authService.logout();
    this.authenticationService.logout();
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard/';
  }


  onSubmit(data) {    
    
    const hash = new SHA3(512);
    hash.update(data.password);
    const sha3pass = hash.digest('hex');
    ///*/
    this.securityService.login(data.username, sha3pass, data.remember)
    //.pipe(first())
    .subscribe(
        data => {
            //console.log(data);
            this.router.navigate(['dashboard/']);
        },
        error => {
            //console.log(error);
            this.alertService.error("El correo o la contraseña no son correctos");
            //this.alertService.error(error);
            //this.loading = false;
        });
    //*/
  }

}
