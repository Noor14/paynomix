import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule , MatInputModule, MatSelectModule, MatButtonToggleModule, MatBottomSheetModule} from '@angular/material';
import { SaleRoutingModule } from './sale-routing.module';
import { MakeSaleComponent } from './make-sale/make-sale.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BottomSheetModule } from '@fuse/components';
@NgModule({
  declarations: [MakeSaleComponent],
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
  ]
})
export class SaleModule { }
