import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerListComponent } from './partner-list/partner-list.component';


const routes: Routes = [
  {
    path: 'partner-list',
    component: PartnerListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerRoutingModule { }
