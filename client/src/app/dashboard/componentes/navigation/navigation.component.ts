import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
 // @ViewChild('sidenav') sidenav: ElementRef;

 // clicked: boolean;

 // mode = new FormControl('over');

  constructor() {
 ///   this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {
    //this.router.navigate(['dashboard/login']);
  }
/*
  setClicked(val: boolean): void {
    this.clicked = val;
  }
//*/
}
