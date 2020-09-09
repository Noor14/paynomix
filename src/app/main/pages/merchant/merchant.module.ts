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


@NgModule({
  declarations: [MerchantListComponent, MerchantCreateComponent, MerchantEditComponent],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    FuseSharedModule,
    MatIconModule
  ]
})
export class MerchantModule { }
