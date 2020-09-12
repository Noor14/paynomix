import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantRoutingModule } from './merchant-routing.module';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MerchantCreateComponent } from './merchant-create/merchant-create.component';
import { MerchantEditComponent } from './merchant-edit/merchant-edit.component';
import { MerchantInfoComponent } from './tabs/merchant-info/merchant-info.component';
import { BusinessDetailComponent } from './tabs/business-detail/business-detail.component';
import { OwnerDetailComponent } from './tabs/owner-detail/owner-detail.component';
import { BankAccountComponent } from './tabs/bank-account/bank-account.component';
import { AllGetherInfoComponent } from './tabs/all-gether-info/all-gether-info.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [MerchantListComponent, MerchantCreateComponent, MerchantEditComponent, MerchantInfoComponent, BusinessDetailComponent, OwnerDetailComponent, BankAccountComponent, AllGetherInfoComponent],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    FuseSharedModule,
    MatIconModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ]
})
export class MerchantModule { }
