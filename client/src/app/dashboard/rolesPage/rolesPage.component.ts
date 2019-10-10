import { Component, OnInit }        from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { ViewChild, AfterViewInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AlertService, RolesService } from 'src/app/_services';
import { RolesConfig } from '../../_models/roles/roles-config'
import { DynamicFormComponent } from '../../_directives/dynamic-form/dynamic-form.component'
import { delay } from 'q';

@Component({
  selector: 'app-rolesPage',
  templateUrl: './rolesPage.component.html',
  styleUrls: ['./rolesPage.component.scss'],
  providers: [RolesService, RolesConfig]
})

export class RolesPageComponent implements AfterViewInit {
    
  public roles=[];
  
  rolesconfig;
  config;

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  formSubmit(value) {    
    this.rolesService.register(value)
    .subscribe(
        data => {
          this.alertService.success("Se agrego un nuevo roles");
          this.getRoles();
          //this.form.controls;
        },
        error => {
            this.alertService.error(error);
        });
    //*/
  }
  
  constructor(private rolesService: RolesService,
              private alertService: AlertService,
              private rolesConfig: RolesConfig) {
    
    this.rolesConfig = new RolesConfig();
    this.config = this.rolesConfig.config();       
    this.getRoles();
  }

  ngAfterViewInit() {    
    let previousValid = this.form.valid;
    
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });
    this.form.setDisabled('submit', true);
  }

  getRoles(){
    this.rolesService.getAll()
    .subscribe(
        data => {
          // console.log(data);
          this.roles =data;
        },
        error => {
         // console.log(error);
            this.alertService.error(error);
        });
  }
  deleteRoles(id) {
    this.rolesService.delete(id)
    .subscribe(
        data => {
          this.alertService.success("Eliminado Exitoso");
          this.getRoles();
        },
        error => {
            this.alertService.error(error);
        });
  }
}
