import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResellerRoutingModule } from './reseller-routing.module';
import { ResellerListComponent } from './reseller-list/reseller-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { ResellerCreateComponent } from './reseller-create/reseller-create.component';
import { ResellerEditComponent } from './reseller-edit/reseller-edit.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ResellerFormComponent } from './reseller-form/reseller-form.component';
import { ResellerTableComponent } from './reseller-table/reseller-table.component';
import { NoFoundModule } from '@fuse/components/no-found/no-found.module';
import { MatTabsModule } from '@angular/material';
import { PricingPlanModule } from '../pricing-plan/pricing-plan.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FuseConfirmDialogModule } from '@fuse/components';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  declarations: [
    ResellerListComponent,
    ResellerCreateComponent,
    ResellerEditComponent,
    ResellerFormComponent,
    ResellerTableComponent
  ],
  entryComponents: [
    ResellerTableComponent,
  ],
  imports: [
    CommonModule,
    ResellerRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    FuseSharedModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    NoFoundModule,
    MatTabsModule,
    PricingPlanModule,
    MatTooltipModule,
    FuseConfirmDialogModule,
    NgxMaskModule.forRoot()
  ]
})
export class ResellerModule { }
