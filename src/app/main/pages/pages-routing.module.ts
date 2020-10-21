import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authRole } from '../../../constants/globalFunctions';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';



const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
    { path: 'dashboard',
      component: DashboardComponent,
      data: {
        roles: Object.values(authRole)
      }
    },
    { path: 'partner', 
      loadChildren: () => import('./partner/partner.module').then(m => m.PartnerModule),
      data: {
        roles: [authRole.admin]
      }
    },
    { path: 'reseller', 
      loadChildren: () => import('./reseller/reseller.module').then(m => m.ResellerModule),
      data: {
        roles: [
          authRole.admin,
          authRole.partner
        ]
      }
    },
    { path: 'merchant',
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
      loadChildren: () => import('./sale/sale.module').then(m => m.SaleModule),
      data: {
        roles: [
          authRole.admin,
          authRole.partner,
          authRole.reseller,
          authRole.merchant
        ]
      }
    },
    { path: 'transaction', 
      loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule),
      data: {
        roles: [
          authRole.admin,
          authRole.partner,
          authRole.reseller,
          authRole.merchant
        ]
      }
    },
    { path: 'pricing-plan', 
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
      loadChildren: () => import('./funding-manager/funding-manager.module').then(m => m.FundingManagerModule),
      data: {
        roles: [
          authRole.admin,
          authRole.partner,
          authRole.reseller
        ]
      }
    },
    { path: 'user',
      loadChildren: () => import('./user/user.module').then(m => m.UserModule),
      data: {
        roles: [
          authRole.admin,
          authRole.partner,
          authRole.reseller
        ]
      }
    },
    { path: 'settings',
      loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
      data: {
        roles: Object.values(authRole)
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
