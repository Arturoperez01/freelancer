import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  //*/,
  {
    path: 'home',
    redirectTo: '/home/index',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/home/index',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
    //canLoad: [AuthGuard]
  },//*/,
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    //canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
