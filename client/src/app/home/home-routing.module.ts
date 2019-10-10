// layput-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home.component";
import { IndexComponent } from "./index/index.component"
//import { AuthGuard }                          from '../auth/auth.guard';

const routes: Routes = [
  {
  path: '', component: HomeComponent,
  //canActivateChild: [AuthGuard],//*/ TODO: Authentificar roles
  children:[
       
      {
        path: 'index',
        component: IndexComponent
        //loadChildren: '../fbaudio/baudio.module#BaudioModule', data: {preload: true}      
      },
      {
        path: 'inscripcion/:id',
        loadChildren: './inscripcionPage/inscripcion.module#InscripcionModule', data: {preload: true}      
      },
      {
        path: 'evento/:id',
        loadChildren: './miseventosPage/miseventospage.module#MisEventosPageModule', data: {preload: true}      
      },
      {
        path: 'misinscripciones/:id',
        loadChildren: './misInscripcionesPage/misinscripcionespage.module#MisInscripcionesPageModule', data: {preload: true}      
      },
      //*/  
  ]
  }
  //*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }