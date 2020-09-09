import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PricingPlanListComponent } from './pricing-plan-list/pricing-plan-list.component';


const routes: Routes = [
  {
    path: 'pricing-plan-list',
    component: PricingPlanListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricingPlanRoutingModule { }
