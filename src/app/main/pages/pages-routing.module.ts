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
    { path: 'dashboard', component: DashboardComponent },
    { path: 'partner', loadChildren: () => import('./partner/partner.module').then(m => m.PartnerModule)},
    { path: 'reseller', loadChildren: () => import('./reseller/reseller.module').then(m => m.ResellerModule)},
    { path: 'merchant', loadChildren: () => import('./merchant/merchant.module').then(m => m.MerchantModule)},
    { path: 'pricing-plan', loadChildren: () => import('./pricing-plan/pricing-plan.module').then(m => m.PricingPlanModule)},
    { path: 'funds', loadChildren: () => import('./funding-manager/funding-manager.module').then(m => m.FundingManagerModule)},
    { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
    { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)},
    { path: '**', redirectTo: 'dashboard' }
  ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
