import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionTableComponent } from './transaction-table/transaction-table.component';
import { MatButtonModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatIconModule, MatInputModule, MatNativeDateModule, MatPaginatorModule, MatSortModule, MatTableModule, MatToolbarModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { NoFoundModule } from '@fuse/components/no-found/no-found.module';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NgxCurrencyModule } from "ngx-currency";
import { ReceiptDialogModule } from '@fuse/components/receipt-dialog/receipt-dialog.module';

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
    MatChipsModule,
    NgxCurrencyModule,
    ReceiptDialogModule

  ]
})
export class TransactionModule { }
