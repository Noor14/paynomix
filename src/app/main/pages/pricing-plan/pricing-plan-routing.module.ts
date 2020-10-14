import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PricingPlanCreateComponent } from './pricing-plan-create/pricing-plan-create.component';
import { PricingPlanEditComponent } from './pricing-plan-edit/pricing-plan-edit.component';
import { PricingPlanComponent } from './pricing-plan/pricing-plan.component';


const routes: Routes = [
  { 
    path: '',
    redirectTo: 'pricing-plan-list',
    pathMatch: 'full'
  },
  {
    path: 'pricing-plan-list',
    component: PricingPlanComponent
  },
  {
    path: 'pricing-plan-create',
    component: PricingPlanCreateComponent
  },
  {
    path: 'pricing-plan-edit/:id',
    component: PricingPlanEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricingPlanRoutingModule { }
