import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule , MatInputModule, MatSelectModule, MatButtonToggleModule, MatButtonModule} from '@angular/material';
import { SaleRoutingModule } from './sale-routing.module';
import { MakeSaleComponent } from './make-sale/make-sale.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BottomSheetModule } from '@fuse/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonalInfoComponent } from './sale-info/personal-info/personal-info.component';
import { CreditcardInfoComponent } from './sale-info/creditcard-info/creditcard-info.component';
import { AchInfoComponent } from './sale-info/ach-info/ach-info.component';
import { NgxStripeModule } from 'ngx-stripe';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxMaskModule } from 'ngx-mask';
@NgModule({
  declarations: [MakeSaleComponent, PersonalInfoComponent, CreditcardInfoComponent, AchInfoComponent],
  entryComponents: [CreditcardInfoComponent, AchInfoComponent],
  imports: [
    CommonModule,
    FuseSharedModule,
    SaleRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    FlexLayoutModule,
    BottomSheetModule,
    NgxStripeModule.forChild(),
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ]
})
export class SaleModule { }
