import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { transactionStatus, transactionType } from '../../../../../constants/globalFunctions';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { TransactionService } from '../transaction.service';
import { ReceiptDialogComponent } from '@fuse/components/receipt-dialog/receipt-dialog.component';
import { EmailDialogComponent } from '@fuse/components/email-dialog/email-dialog.component';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {
  public transType = transactionType;
  public transStatus = transactionStatus;
  public transactionDetail: any = {};
  private _unsubscribeAll: Subject<any>;
  public dialogRef: any;
  /**
  * Constructor
  *
  * @param {TransactionService} _transactionService
  * @param {ActivatedRoute} _route
  * @param {MatSnackBar} _snackBar
  * @param {Router} _router
  */
  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _transactionService: TransactionService,
    private readonly _dialog: MatDialog,
  ) { }

  ngOnInit() {
    this._route.paramMap
      .pipe(
        map((param) => param.get('id')),
        switchMap((id) =>
          this._transactionService.getTransactionDetail(id)
        ),
        tap((res: any) => (this.transactionDetail = res.Response)),
      )
      .subscribe();
  }

  printReceipt(obj) {
    const dialogRef = this._dialog.open(ReceiptDialogComponent, { width: '400px' });
    dialogRef.componentInstance.data = obj;
  }

  openemailDialog(obj) {
    const dialogRef = this._dialog.open(EmailDialogComponent, {width: '550px'});
    obj.isSingleInput = true
    dialogRef.componentInstance.data = obj ;

   }

  print() {
      
    window.print();

  }
   
}
