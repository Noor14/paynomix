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
import { PartnerTableComponent } from './partner-table/partner-table.component';
import { NoFoundModule } from '@fuse/components/no-found/no-found.module';
import { MatTooltipModule} from '@angular/material/tooltip';
import { FuseConfirmDialogModule } from '@fuse/components';
import {NgxMaskModule} from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
  declarations: [
    PartnerListComponent, 
    PartnerEditComponent, 
    PartnerCreateComponent, 
    PartnerFormComponent, 
    PartnerTableComponent,
  ],
  entryComponents:[PartnerTableComponent],
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
    PricingPlanModule,
    MatTooltipModule,
    FuseConfirmDialogModule,
    NoFoundModule,
    NgxCurrencyModule,
    NgxMaskModule.forRoot()
  ]
})
export class PartnerModule { }
