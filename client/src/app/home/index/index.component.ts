import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_auth/authentication.service';
//import { Services } from './services/services';
//import {LoginModel} from './login.model';
import { store } from '../../_auth/current-user';
//import {GLOBAL} from './../../../config/config';
@Component({
  selector: 'app-index',
  templateUrl: './index.html'
  //styleUrls: ['./home.css'],
  //providers: [Services],
})
export class IndexComponent implements OnInit {
  title = 'Index';
  login;
  constructor(
              private authService: AuthenticationService
            ){}
 ngOnInit() {
   this.authService.getUser().subscribe(user => this.login = user, err => this.login = null);
   store.currentUser$.subscribe(user => this.login = user);
  //this.login = sessionStorage.getItem('token') || localStorage.getItem('token');
  }
  
}
