import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FundingManagerRoutingModule } from './funding-manager-routing.module';
import { FundingListComponent } from './funding-list/funding-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [FundingListComponent],
  imports: [
    CommonModule,
    FundingManagerRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FuseSharedModule,
    MatButtonModule
  ]
})
export class FundingManagerModule { }
