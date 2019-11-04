import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormControl} from '@angular/forms';
import { store } from '../../../_auth/current-user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../_auth/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
 // @ViewChild('sidenav') sidenav: ElementRef;

 // clicked: boolean;
 login;
 // mode = new FormControl('over');

  constructor(
                private authService: AuthenticationService,
                private router: Router
              ) {
 ///   this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {
    this.login = this.authService.getUser().subscribe(user => this.login = user, err => this.login = null);
    store.currentUser$.subscribe(user =>this.login = user);
    //this.router.navigate(['dashboard/login']);
  }
  
  logOff(){
    this.authService.logout();      
    location.reload();  
    this.router.navigateByUrl('/dashboard/login')
  }
/*
  setClicked(val: boolean): void {
    this.clicked = val;
  }
//*/
}
