import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { BuyComponent } from './buy/buy.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path : '',
    component : HomeComponent
  },
  {
    path : 'home',
    component : HomeComponent
  },
  {
    path : 'details/:title',
    component : DetailsComponent
  },
  {
    path : 'buy',
    canActivate : [AuthGuard],    
    component : BuyComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'newuser',
    loadChildren: () => import('./new-user/new-user.module').then(m => m.NewUserModule) 
  },
  {
    path : 'newuser/resetpassword',
    loadChildren: () => import('./new-user/new-user.module').then(m => m.NewUserModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
