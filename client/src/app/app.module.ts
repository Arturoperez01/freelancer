import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationService } from './_auth/authentication.service';
import {RolesService,ServicioService} from './_services'
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    //...APP_MODULE_IMPORTS,
    //MaterialModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,    
    AppRoutingModule,
    FormsModule
  ],
  providers: [RolesService,ServicioService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
