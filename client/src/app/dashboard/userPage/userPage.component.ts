import { Component, OnInit }        from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
//import { UserFormService} from './userForm.service';
import { AlertService, UserService } from 'src/app/_services';
import { UserConfig } from '../../_models/user'
import { DynamicFormComponent } from '../../_directives/dynamic-form/dynamic-form.component'

@Component({
  selector: 'app-userPage',
  templateUrl: './userPage.component.html',
  styleUrls: ['./userPage.component.scss']
  //, providers: [UserConfig]
})

export class UserPageComponent {
    
  public users=[];
  


  constructor(
              private alertService: AlertService,
              private userService: UserService
              ) 
  {
    
    //this.userConfig = new UserConfig();
    this.getUsers();
  }


  formSubmit(value) {
    
    this.userService.register(value)
    .subscribe(
        data => {
          
          this.alertService.success("Se agrego un nuevo usuario");
          this.getUsers();
        },
        error => {
            this.alertService.error("Error al agregar usuario");
        });
    //*/
  }
  
  getUsers(){
    this.userService.getAll()
    .subscribe(
        data => {
          // console.log(data);
          this.users =data;
        },
        error => {
         // console.log(error);
            this.alertService.error(error);
        });
  }

  deleteUser(id) {
    this.userService.delete(id)
    .subscribe(
        data => {
          this.alertService.success("Eliminado Exitoso");
          this.getUsers();
        },
        error => {
            this.alertService.error(error);
        });
  }
}
