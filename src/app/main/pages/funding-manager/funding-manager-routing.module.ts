import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FundingListComponent } from './funding-list/funding-list.component';


const routes: Routes = [
  { path: '',
    redirectTo: 'funding-list',
    pathMatch: 'full'
  },
  {
    path: 'funding-list',
    component: FundingListComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundingManagerRoutingModule { }
