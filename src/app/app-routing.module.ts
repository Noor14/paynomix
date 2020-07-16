import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'pages', loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)},
  { path: '', loadChildren: () => import('./main/authentication/authentication.module').then(m => m.AuthenticationModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
