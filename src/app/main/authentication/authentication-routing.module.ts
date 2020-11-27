import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { InactiveUserComponent } from './inactive-user/inactive-user.component';
import { AuthenticationComponent } from './authentication.component';


const routes: Routes = [
  {
    path: '', 
    component: AuthenticationComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'inactive', component: InactiveUserComponent},
      { path: '**', redirectTo: 'login' }
    ]
 }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
