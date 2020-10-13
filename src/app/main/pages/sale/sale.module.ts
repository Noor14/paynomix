import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule , MatInputModule, MatSelectModule, MatButtonToggleModule, MatBottomSheetModule, MatButtonModule} from '@angular/material';
import { SaleRoutingModule } from './sale-routing.module';
import { MakeSaleComponent } from './make-sale/make-sale.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BottomSheetModule } from '@fuse/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonalInfoComponent } from './sale-info/personal-info/personal-info.component';
import { CreditcardInfoComponent } from './sale-info/creditcard-info/creditcard-info.component';
import { AchInfoComponent } from './sale-info/ach-info/ach-info.component';
@NgModule({
  declarations: [MakeSaleComponent, PersonalInfoComponent, CreditcardInfoComponent, AchInfoComponent],
  entryComponents: [CreditcardInfoComponent, AchInfoComponent],
  imports: [
    CommonModule,
    SaleRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    FlexLayoutModule,
    MatBottomSheetModule,
    BottomSheetModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class SaleModule { }
