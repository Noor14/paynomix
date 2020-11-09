import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptDialogComponent } from './receipt-dialog.component'; 
import { MatButtonModule, MatDialogModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';

@NgModule({
  declarations: [ReceiptDialogComponent],
  entryComponents: [ReceiptDialogComponent],

  imports: [
    CommonModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    FuseSharedModule
  ]
})
export class ReceiptDialogModule { }
