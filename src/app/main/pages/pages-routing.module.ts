import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
    {path: 'dashboard', component: DashboardComponent},
    { path: 'partner', loadChildren: () => import('./partner/partner.module').then(m => m.PartnerModule)},
    { path: 'reseller', loadChildren: () => import('./reseller/reseller.module').then(m => m.ResellerModule)},
    {path: 'settings', component: SettingsComponent},
    { path: '**', redirectTo: 'dashboard' }
  ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
