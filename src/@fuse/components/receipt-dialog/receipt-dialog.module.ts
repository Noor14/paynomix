import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptDialogComponent } from './receipt-dialog.component'; 
import { MatButtonModule, MatDialogModule, MatIconModule, MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [ReceiptDialogComponent],
  entryComponents: [ReceiptDialogComponent],

  imports: [
    CommonModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ReceiptDialogModule { }
