import { Component, OnInit }        from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { ViewChild, AfterViewInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AlertService, ServicioService } from 'src/app/_services';
import { ServicioConfig } from '../../_models/servicio/servicio-config'
import { DynamicFormComponent } from '../../_directives/dynamic-form/dynamic-form.component'
import { delay } from 'q';

@Component({
  selector: 'app-servicioPage',
  templateUrl: './servicioPage.component.html',
  styleUrls: ['./servicioPage.component.scss'],
  providers: [ ServicioConfig]
})

export class ServicioPageComponent implements AfterViewInit {
    
  public servicios=[];
  
  servicioconfig;
  config;

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  formSubmit(value) {  
    this.servicioService.register(value)
    .subscribe(
        data => {
          this.alertService.success("Se agrego un nuevo servicio");
          this.getServicio();
          //this.form.controls;
        },
        error => {
            this.alertService.error(error);
        });
    //*/
  }
  
  constructor(private servicioService: ServicioService,
              private alertService: AlertService,
              private servicioConfig: ServicioConfig) {
    
    this.servicioConfig = new ServicioConfig();
    this.config = this.servicioConfig.config();       
    this.getServicio();
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

  getServicio(){
    this.servicioService.getAll()
    .subscribe(
        data => {
          // console.log(data);
          this.servicios = data;
        },
        error => {
         // console.log(error);
            this.alertService.error(error);
        });
  }
  deleteServicio(id) {
    this.servicioService.delete(id)
    .subscribe(
        data => {
          this.alertService.success("Eliminado Exitoso");
          this.getServicio();
        },
        error => {
            this.alertService.error(error);
        });
  }
}
