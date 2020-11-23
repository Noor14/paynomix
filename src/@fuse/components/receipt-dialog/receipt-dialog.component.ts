import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { environment } from '../../../environments/environment';
import { transactionStatus, transactionType } from '../../../constants/globalFunctions';

@Component({
  selector: 'app-receipt-dialog',
  templateUrl: './receipt-dialog.component.html',
  styleUrls: ['./receipt-dialog.component.scss']
})
export class ReceiptDialogComponent implements OnInit {
  public transType = transactionType;
  public transStatus = transactionStatus;
  public appInfo = environment;

  @Input() data:any
  constructor(
    public readonly _dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
  }

  print(){
    window.print();
  }
}
