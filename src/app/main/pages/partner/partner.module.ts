import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { PartnerEditComponent } from './partner-edit/partner-edit.component';
import { PartnerCreateComponent } from './partner-create/partner-create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PartnerFormComponent } from './partner-form/partner-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PricingPlanModule } from '../pricing-plan/pricing-plan.module';

@NgModule({
  declarations: [
    PartnerListComponent, 
    PartnerEditComponent, 
    PartnerCreateComponent, 
    PartnerFormComponent
  ],
  imports: [
    CommonModule,
    PartnerRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    FuseSharedModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatFormFieldModule,
    PricingPlanModule

  ]
})
export class PartnerModule { }
