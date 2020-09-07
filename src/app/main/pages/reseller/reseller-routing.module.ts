import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResellerListComponent } from './reseller-list/reseller-list.component';


const routes: Routes = [
  {
    path: 'reseller-list',
    component: ResellerListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResellerRoutingModule { }
