import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionTableComponent } from './transaction-table/transaction-table.component';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { NoFoundModule } from '@fuse/components/no-found/no-found.module';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import {MatTooltipModule} from '@angular/material/tooltip';

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
  ]
})
export class TransactionModule { }
