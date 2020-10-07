import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MakeSaleComponent } from './make-sale/make-sale.component';


const routes: Routes = [
  { 
    path: '',
    redirectTo: 'make-sale',
    pathMatch: 'full'
  },
  {
    path: 'make-sale',
    component: MakeSaleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
