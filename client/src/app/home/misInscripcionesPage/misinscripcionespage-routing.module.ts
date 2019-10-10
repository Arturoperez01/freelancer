import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MisInscripcionesPageComponent } from './misinscripcionespage.component';

const routes: Routes = [
  {
    path: '',
    component: MisInscripcionesPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisInscripcionesPageRoutingModule { }
