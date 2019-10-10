import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../_auth/services/security.service';
import SHA3 from 'sha3';
import { Router } from '@angular/router';
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
  
  constructor(private authService: SecurityService,
              private router: Router
              ) {
    //this.setMessage();
    //$(".loader").fadeOut("slow");
  }
  
  ngOnInit(){
    
    this.login = sessionStorage.getItem('token') || localStorage.getItem('token');
    //console.log(this.login);
    /*
    if(this.login){

    this.login = sessionStorage.getItem('token') || localStorage.getItem('token');
    } 
    //*/
  }

  setMessage(message) {
    this.message = message;
    //this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  onLogin(data) {
    //console.log("dahsboard login",data);
    
    const hash = new SHA3(512);
    hash.update(data.password);
    const sha3pass = hash.digest('hex');
    this.authService.login(data.username, sha3pass, data.remember)
    .subscribe(
        data => {
            console.log(data);        
            location.reload();  
            //this.router.navigate([this.returnUrl]);
        },
        error => {
            console.log(error);
            this.setMessage(error);
            //this.alertService.error(error);
            //this.loading = false;
        });
    //*/
    this.setMessage("something");
  }

  onSignup(data) {
    //console.log("dahsboard login",data);
    /*
    this.authService.createUser(data)
    .subscribe(
        data => {
            console.log(data);
            //this.router.navigate([this.returnUrl]);
          /*
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
    this.setMessage("something");
  }
  
  logOff(){
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('/home')
  }
}

