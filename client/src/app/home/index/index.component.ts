import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Services } from './services/services';
//import {LoginModel} from './login.model';

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
  constructor(){
  }
 ngOnInit() {
  this.login = sessionStorage.getItem('token') || localStorage.getItem('token');
  }
  
}
