import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MisEventosPageComponent } from './miseventospage.component';

const routes: Routes = [
  {
    path: '',
    component: MisEventosPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisEventosPageRoutingModule { }
