import { Component, OnInit } from '@angular/core';
import { store } from '../../app/_auth/current-user';
import { SecurityService } from '../_auth/services/security.service';
import { AuthenticationService } from '../_auth/authentication.service';
import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service'

/*
declare var $: any
declare var require: any;

import {GLOBAL} from './../../config/config'
import { Services } from './../services/services';
import {Observable} from 'rxjs/Observable';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { ConsolidadoModel } from '../ausentismo/ausentismo/consolidado.model';
//*/

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
              private alertService: AlertService
              ) {
    //this.setMessage();
    //$(".loader").fadeOut("slow");
  }
  
  ngOnInit(){
    this.login = this.authService.getUser().subscribe(user => this.login = user, err => this.login = null);
    store.currentUser$.subscribe(user =>this.login = user);
    //store.currentUser$.subscribe(user =>{ console.log(user); });
    //sessionStorage.getItem('token') || localStorage.getItem('token');
    //console.log(this.login);
    /*
    if(this.login){

    this.login = sessionStorage.getItem('token') || localStorage.getItem('token');
    } 
    //*/
  }


  onLogin(data) {
      
    if(!data.status){    
      //this.setUser(data);   
      //location.reload();  
      this.router.navigate(['/']);
    }else{
      this.alertService.error(data.statusText)
    };
  }

  onSignup(data) {
    //console.log("dahsboard signup",data);
    
    if(!data.status){    
      //console.log(data)
      //this.setUser(data);   
      //location.reload();  
      this.router.navigate(['/']);
    }else{
      this.alertService.error(data.statusText)
    };
    /*
    this.authService.createUser(data)
    .subscribe(
        data => {
            console.log(data);
            //this.router.navigate([this.returnUrl]);
          
            if(data.auth.success == 'OK'){
              localStorage.setItem('info',JSON.stringify(data.auth.data));
              localStorage.setItem('token',data.auth.token);            
              localStorage.setItem('imgUser',data.imgUser);            
              //this._router.navigate(["/home"]);            
              location.reload();  
          }else{
            this.message='Usuario y/o password incorrectos';
          }
        },
        error => {
            console.log(error);
            this.setMessage(error);
            //this.alertService.error(error);
            //this.loading = false;
        });
    //*/
  }
  
  logOff(){
    this.authService.logout();      
    location.reload();  
    this.router.navigateByUrl('/home')
  }
}

