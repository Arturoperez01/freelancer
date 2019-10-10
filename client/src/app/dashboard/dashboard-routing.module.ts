// layput-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "./dashboard.component";
import { LoginPageComponent } from "./loginPage/loginPage.component";
import { HomePageComponent } from "./homePage/homePage.component";  
import { UserPageComponent } from "./userPage/userPage.component";
import { UserEditComponent } from "./userPage/edit-user/userEdit.component"
import { RolesPageComponent } from "./rolesPage/rolesPage.component";
import { ServicioPageComponent } from "./servicioPage/servicioPage.component";
import { AuthGuard }         from '../_auth/auth.guard';

const routes: Routes = [
  { 
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: '', component: DashboardComponent , canActivate: [AuthGuard], 
  children:
  [
      { path: 'home', component: HomePageComponent },
      { path: 'user', component: UserPageComponent },
      { path: 'roles', component: RolesPageComponent },
      { path: 'servicios', component: ServicioPageComponent },
      { path: 'user/:id', component: UserEditComponent },
      { path: 'eventos', loadChildren: './eventos/eventos.module#EventosModule'},
      { path: 'eventos/:id', loadChildren: './eventos/edit-eventos/editEventos.module#EditEventosModule'}
    
    /*
    { path: '', component: HomePageComponent , //canActivateChild: [AuthGuard] , 
      children:
        [
          { path: 'home', component: HomePageComponent },
          { path: 'user', component: UserPageComponent },
          { path: 'user/:id', component: UserEditComponent }  
        ]
    }//*/
  ]//*/
  },
  {
    path: 'login',
    component: LoginPageComponent
  }
  //*/
//{ path: 'modals', component: ModalsComponent},
//{ path: '**', component: NotFoundComponent },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }