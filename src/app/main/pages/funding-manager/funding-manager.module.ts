import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FundingManagerRoutingModule } from './funding-manager-routing.module';
import { FundingListComponent } from './funding-list/funding-list.component';


@NgModule({
  declarations: [FundingListComponent],
  imports: [
    CommonModule,
    FundingManagerRoutingModule
  ]
})
export class FundingManagerModule { }
