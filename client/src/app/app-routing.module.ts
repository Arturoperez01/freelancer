import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard }         from './_auth/auth.guard';
import { LoginPageComponent } from "./dashboard/loginPage/loginPage.component";
import { PageNotFoundComponent } from "./pagenotfound.component";
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
  },
  {
    path: 'dashboard/login',
    loadChildren: './dashboard/loginPage/loginPage.module#loginPageModule',
    //component: LoginPageComponent
  },//*/,
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canLoad: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
