import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionTableComponent } from './transaction-table/transaction-table.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { NoFoundModule } from '@fuse/components/no-found/no-found.module';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxCurrencyModule } from "ngx-currency";
import { ReceiptDialogModule } from '@fuse/components/receipt-dialog/receipt-dialog.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelect, MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [TransactionListComponent, TransactionTableComponent, TransactionDetailComponent],
  entryComponents: [
    TransactionTableComponent,
  ],
  exports: [TransactionTableComponent],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    NoFoundModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    FuseSharedModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    NgxCurrencyModule,
    ReceiptDialogModule,
    MatSelectModule
  ]
})
export class TransactionModule { }
