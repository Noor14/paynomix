import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-receipt-dialog',
  templateUrl: './receipt-dialog.component.html',
  styleUrls: ['./receipt-dialog.component.scss']
})
export class ReceiptDialogComponent implements OnInit {

  @Input() data:any
  constructor(
    public readonly _dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit() {
  }

}
