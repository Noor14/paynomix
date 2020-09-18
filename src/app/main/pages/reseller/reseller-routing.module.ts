import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResellerListComponent } from './reseller-list/reseller-list.component';
import { ResellerCreateComponent } from './reseller-create/reseller-create.component';
import { ResellerEditComponent } from './reseller-edit/reseller-edit.component';


const routes: Routes = [
  { 
    path: '',
    redirectTo: 'reseller-list',
    pathMatch: 'full'
  },
  {
    path: 'reseller-list',
    component: ResellerListComponent
  },
  {
    path: 'reseller-create',
    component: ResellerCreateComponent
  },
  {
    path: 'reseller-edit/:id',
    component: ResellerEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResellerRoutingModule { }
