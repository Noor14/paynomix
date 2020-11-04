import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionControlsComponent } from './transaction-controls.component';

const routes: Routes = [
  { 
    path: '',
    component: TransactionControlsComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionControlsRoutingModule { }
