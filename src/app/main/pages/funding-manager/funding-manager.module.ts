import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundingManagerRoutingModule } from './funding-manager-routing.module';
import { FundingListComponent } from './funding-list/funding-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { FundedComponent } from './tabs/funded/funded.component';
import { NonFundedComponent } from './tabs/non-funded/non-funded.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [FundingListComponent, FundedComponent, NonFundedComponent],
  imports: [
    CommonModule,
    FundingManagerRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FuseSharedModule,
    MatButtonModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class FundingManagerModule { }
