import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { PartnerCreateComponent } from './partner-create/partner-create.component';
import { PartnerEditComponent } from './partner-edit/partner-edit.component';


const routes: Routes = [
  { path: '',
    redirectTo: 'partner-list',
    pathMatch: 'full'
  },
  {
    path: 'partner-list',
    component: PartnerListComponent
  },
  {
    path: 'partner-create',
    component: PartnerCreateComponent
  },
  {
    path: 'partner-edit/:id',
    component: PartnerEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerRoutingModule { }
