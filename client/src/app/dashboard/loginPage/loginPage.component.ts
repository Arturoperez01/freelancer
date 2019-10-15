import { Component }        from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SecurityService } from '../../_auth/services/security.service'
import { AlertService } from '../../_services';
import { AuthenticationService } from '../../_auth/authentication.service';
import { store } from '../../_auth/current-user';
import { User } from '../../_models/user'
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
    
    if(!data.status){    
      //location.reload();  
      this.setUser(data);
      this.router.navigate(['dashboard/']);
    }else{
      this.alertService.error(data.statusText)
    };
  }

    private setUser(user: User) {
        store.setUser(user);
    }
}
