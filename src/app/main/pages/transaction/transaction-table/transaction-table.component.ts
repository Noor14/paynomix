import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { transactionType, transactionStatus, snackBarConfig, snackBarConfigWarn } from '../../../../../constants/globalFunctions';
import { TransactionService } from '../transaction.service';
import * as globalConfig from '../../../../../constants/globalFunctions';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
  trigger('detailExpandRefund', [
    state('collapsed', style({ height: '0px', minHeight: '0' })),
    state('expanded', style({ height: '*' })),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  ]),
  fuseAnimations,
]
})
export class TransactionTableComponent implements OnInit {
  public expandedRefundDetail:any;
  public transStatus = transactionStatus;
  public transType = transactionType;
  public refundForm: FormGroup;
  public selection = new SelectionModel<any>(true, []);
  public showRefund: boolean;
  private selectedToRefund: any = {};
  public dialogRef;
  @Input() data: any;
  @ViewChild('refundDialog', { static: false }) refundDialog: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public dataSource = new MatTableDataSource<any>();
  @Output() updateList = new EventEmitter<boolean>();
  public actionControlOnHover = -1;
  public displayedColumns: string[] = [
    'Icon',
    'Select',
    'TransactionId',
    'TransactionType',
    'InsertedOn',
    'Amount',
    'MerchantName',
    'Status',
    'CardholderName'
  ];
 public RefundDisplayedColumns: string[] = [
   'subTransactionId', 
   'subAmount', 
   'status', 
   'subInsertedOn', 
   'subAction'
]; 
  constructor(
    private readonly _dialog: MatDialog,
    private readonly _formBuilder: FormBuilder,
    private readonly _transactionService: TransactionService,
    private readonly _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.dataSource.data = this.data.transaction;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }
  selectRefundElement(value) {
    if (this.selection.selected.length == 1 && this.selection.hasValue()) {
      this.selectedToRefund = value;
      this.showRefund = true;
    }else{
      this.showRefund = false;
    }
  }
  openRefundDialog() {
    this.createRefundForm();
    this.dialogRef = this._dialog.open(this.refundDialog, { width: '600px' });
    this.dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.updateList.emit(true)
      }
    })
  }
  createRefundForm() {
    this.refundForm = this._formBuilder.group({
      TransactionId: [this.selectedToRefund.TransactionId, Validators.required],
      TransactionAmount: [this.selectedToRefund.Amount, Validators.required],
      Amount: ['', Validators.required],
      Reason: ['requested_by_customer', Validators.required],
    });
  }
  refund() {
    if (this.refundForm.valid) {
      this._transactionService.refundTransaction(this.refundForm.value)
        .then((res: any) => {
          if (res && !res.StatusCode) {
            this._snackBar.open('Amount refunded successfully', '', snackBarConfig);
            this.dialogRef.close(true);

          } else {
            this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn);
            this.dialogRef.close();
          }

        }).catch((err: HttpErrorResponse)=>(console.log));
    } else  {
      globalConfig.validateAllFormFields(this.refundForm)
    }
  }
}
