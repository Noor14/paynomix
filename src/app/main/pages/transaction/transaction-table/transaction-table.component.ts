import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { transactionType, transactionStatus, snackBarConfig, snackBarConfigWarn } from '../../../../../constants/globalFunctions';
import { TransactionService } from '../transaction.service';
import * as globalConfig from '../../../../../constants/globalFunctions';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss'],
  animations: fuseAnimations
})
export class TransactionTableComponent implements OnInit, AfterViewInit {
  public transStatus = transactionStatus;
  public transType = transactionType;
  public refundForm: FormGroup;
  public selection = new SelectionModel<any>(true, []);
  public showRefund: boolean;
  public selectedToRefund: any;
  public dialogRef;
  @Input() data: any;
  @ViewChild('refundDialog', { static: false }) refundDialog: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public dataSource = new MatTableDataSource<any>();
  public actionControlOnHover = -1;
  public displayedColumns: string[] = [
    'Select',
    'TransactionId',
    'TransactionType',
    'InsertedOn',
    'Amount',
    'CustomerName',
    'Status',
    'CardholderName'
  ];
  constructor(
    private readonly _dialog: MatDialog,
    private readonly _formBuilder: FormBuilder,
    private readonly _transactionService: TransactionService,
    private readonly _snackBar: MatSnackBar,
    private readonly _cdref: ChangeDetectorRef,
  ) { }
  ngAfterViewInit(): void {
    this._cdref.detectChanges();
  }

  ngOnInit(): void {
    this._cdref.detectChanges();
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
  checkboxLabel(row?: any): string {
    if (this.selection.selected.length == 1 && this.selection.hasValue()) {
      this.showRefund = true;
    }
    if (this.selection.selected.length > 1 && this.selection.hasValue()) {
      this.showRefund = false;
    }
    if (!this.selection.hasValue()) {
      this.showRefund = false;
    }

    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Amount + 1}`;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }
  SelectRefundElement(value) {
    this.selectedToRefund = value;
    console.log(value);
  }
  RefundDialog() {
    this.createRefundForm();
    this.dialogRef = this._dialog.open(this.refundDialog, { width: '600px' });
  }
  createRefundForm() {
    this.refundForm = this._formBuilder.group({
      TransactionId: [this.selectedToRefund.TransactionId, Validators.required],
      TransactionAmount: [(this.selectedToRefund) ? this.selectedToRefund.Amount : '', Validators.required],
      Amount: ['', Validators.required],
      Reason: ['requested_by_customer', Validators.required],
    });
  }
  Refund() {
    if (this.refundForm.valid) {
      this._transactionService.refundTransaction(this.refundForm.value)
        .then((res: any) => {
          if (res && !res.StatusCode) {
            console.log(res);
            this._snackBar.open('Amount refunded successfully', '', snackBarConfig);
          } else {
            this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn);
          }
          this.dialogRef.close();
        }).catch((err: HttpErrorResponse)=>(console.log));
    } else  {
      globalConfig.validateAllFormFields(this.refundForm)
    }
  }
}
