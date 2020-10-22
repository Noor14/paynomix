import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';


const routes: Routes = [
  { path: '',
    redirectTo: 'transaction-list',
    pathMatch: 'full'
  },
  {
    path: 'transaction-list',
    component: TransactionListComponent
  },
  {
    path: 'transaction-detail/:id',
    component: TransactionDetailComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
