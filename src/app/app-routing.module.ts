import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, PageGuard } from '@fuse/services/auth.guard';


const routes: Routes = [
  { 
  path: 'pages',
  loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule),
  canActivate: [PageGuard], 
  canActivateChild: [PageGuard]
  },
  { 
  path: '', 
  loadChildren: () => import('./main/authentication/authentication.module').then(m => m.AuthenticationModule),
  canActivate: [AuthGuard], 
  canActivateChild: [AuthGuard] 
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
