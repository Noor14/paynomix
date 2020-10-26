import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageGuard } from '@fuse/services/auth.guard';
import { authRole } from '../../../constants/globalFunctions';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [

    { 
      path: 'dashboard',
      canLoad: [PageGuard],
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      data: {
        roles: Object.values(authRole).filter(item => typeof item === 'number')
      }
    },
    { path: 'partner', 
      canLoad: [PageGuard],
      loadChildren: () => import('./partner/partner.module').then(m => m.PartnerModule),
      data: {
        roles: [authRole.admin]
      }
    },
    { path: 'reseller', 
      canLoad: [PageGuard],
      loadChildren: () => import('./reseller/reseller.module').then(m => m.ResellerModule),
      data: {
        roles: [
          authRole.admin,
          authRole.partner
        ]
      }
    },
    { path: 'merchant',
      canLoad: [PageGuard],
      loadChildren: () => import('./merchant/merchant.module').then(m => m.MerchantModule),
      data: {
        roles: [
          authRole.admin,
          authRole.partner,
          authRole.reseller
        ]
      }
    },
    { path: 'sale', 
      canLoad: [PageGuard],
      loadChildren: () => import('./sale/sale.module').then(m => m.SaleModule),
      data: {
        roles: Object.values(authRole).filter(item => typeof item === 'number')
      }
    },
    { path: 'transaction', 
      canLoad: [PageGuard],
      loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule),
      data: {
        roles: Object.values(authRole).filter(item => typeof item === 'number')
      }
    },
    { path: 'pricing-plan', 
      canLoad: [PageGuard],
      loadChildren: () => import('./pricing-plan/pricing-plan.module').then(m => m.PricingPlanModule),
      data: {
        roles: [
          authRole.admin,
          authRole.partner,
          authRole.reseller
        ]
      }
    },
    { path: 'funds', 
      canLoad: [PageGuard],
      loadChildren: () => import('./funding-manager/funding-manager.module').then(m => m.FundingManagerModule),
      data: {
        roles: [
          authRole.admin
        ]
      }
    },
    { path: 'user',
      canLoad: [PageGuard],
      loadChildren: () => import('./user/user.module').then(m => m.UserModule),
      data: {
        roles: [
          authRole.admin,
          authRole.partner,
          authRole.reseller,
          authRole.merchant
        ]
      }
    },
    { path: 'settings',
      canLoad: [PageGuard],
      loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
      data: {
        roles: Object.values(authRole).filter(item => typeof item === 'number')
      }

    },
    { path: '**', redirectTo: 'dashboard' }
  ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
