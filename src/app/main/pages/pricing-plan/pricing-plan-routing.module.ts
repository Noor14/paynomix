import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PricingPlanListComponent } from './pricing-plan-list/pricing-plan-list.component';
import { PricingPlanCreateComponent } from './pricing-plan-create/pricing-plan-create.component';
import { PricingPlanEditComponent } from './pricing-plan-edit/pricing-plan-edit.component';


const routes: Routes = [
  {
    path: 'pricing-plan-list',
    component: PricingPlanListComponent
  },
  {
    path: 'pricing-plan-create',
    component: PricingPlanCreateComponent
  },
  {
    path: 'pricing-plan-edit',
    component: PricingPlanEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricingPlanRoutingModule { }
