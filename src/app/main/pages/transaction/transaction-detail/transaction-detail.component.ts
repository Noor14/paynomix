import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { transactionStatus, transactionType } from '../../../../../constants/globalFunctions';
import { Subject } from 'rxjs';
import { takeUntil, map, switchMap, tap } from 'rxjs/operators';
import { TransactionService } from '../transaction.service';

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
   
}
