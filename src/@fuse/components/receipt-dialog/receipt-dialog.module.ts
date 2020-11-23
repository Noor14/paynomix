import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptDialogComponent } from './receipt-dialog.component'; 
import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

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
