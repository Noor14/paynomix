import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { ResellerListComponent } from './reseller-list/reseller-list.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'partner-list', component: PartnerListComponent},
    {path: 'reseller-list', component: ResellerListComponent},
    { path: '**', redirectTo: 'dashboard' }
  ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
