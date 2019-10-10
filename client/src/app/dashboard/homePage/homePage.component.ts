import { Component }        from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../_auth'
import { AlertService } from '../../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-homePage',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.scss'],
  providers: [ AuthenticationService, AlertService ]
})
export class HomePageComponent {
  message: string;
  login;
  loading = false;
  submitted = false;
  returnUrl: string;
  
  constructor(
                private route: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthenticationService,
                private alertService: AlertService
              ) {
    //this.setMessage();
    //$(".loader").fadeOut("slow");
    
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard/';
  }


}
