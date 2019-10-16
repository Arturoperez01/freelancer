import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { store } from '../../app/_auth/current-user';
import { SecurityService } from '../_auth/services/security.service';
import { AuthenticationService } from '../_auth/authentication.service';
import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ["./home.component.scss"],
  providers: [SecurityService],
})
export class HomeComponent implements OnInit {

  message: string;
  public login;
  
  constructor(private securityService: SecurityService,
              private authService: AuthenticationService,
              private router: Router,
              private alertService: AlertService,
              ) {
    //this.setMessage();
    //$(".loader").fadeOut("slow");
  }
  
  @ViewChild('closeModal') closeModal: ElementRef;

  ngOnInit(){
    this.login = this.authService.getUser().subscribe(user => this.login = user, err => this.login = null);
    store.currentUser$.subscribe(user =>this.login = user);
  }


  onLogin(data) {
      
    if(!data.status){    
      this.closeModal.nativeElement.click();
      this.router.navigate(['/']);
    }else{
      this.alertService.error(data.statusText)
    };
  }

  onSignup(data) {
    
    if(!data.status){    
      this.closeModal.nativeElement.click();
      this.router.navigate(['/']);
    }else{
      this.alertService.error(data.statusText)
    };
  }
  
  logOff(){
    this.authService.logout();      
    location.reload();  
    this.router.navigateByUrl('/home')
  }
}

