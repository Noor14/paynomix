import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ReceiptDialogModule } from '@fuse/components/receipt-dialog/receipt-dialog.module';
import { NgxCurrencyModule } from "ngx-currency";
import {NgxMaskModule} from 'ngx-mask';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


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
    ReceiptDialogModule,
    NgxCurrencyModule,
    NgxMaskModule.forRoot(),

  ]
})
export class SaleModule { }
