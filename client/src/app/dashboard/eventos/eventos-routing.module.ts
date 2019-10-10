import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventosPageComponent } from './eventos.component';

const routes: Routes = [
  {
    path: '',
    component: EventosPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosPageRoutingModule { }
