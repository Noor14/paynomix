import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { MerchantCreateComponent } from './merchant-create/merchant-create.component';
import { MerchantEditComponent } from './merchant-edit/merchant-edit.component';


const routes: Routes = [  
  { path: '',
  redirectTo: 'merchant-list',
  pathMatch: 'full'
},
  {
  path: 'merchant-list',
  component: MerchantListComponent
  },
  {
    path: 'merchant-create',
    component: MerchantCreateComponent
  },
  {
      path: 'merchant-edit/:id',
      component: MerchantEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule { }
