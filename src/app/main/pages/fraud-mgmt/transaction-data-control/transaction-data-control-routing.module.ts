import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionDataControlComponent } from './transaction-data-control.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionDataControlComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionDataControlRoutingModule { }
