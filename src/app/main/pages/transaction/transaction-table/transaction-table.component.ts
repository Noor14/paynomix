import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {transactionType, transactionStatus } from '../../../../../constants/globalFunctions';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent implements OnInit{
  public transStatus = transactionStatus;
  public transType = transactionType;
  @Input() data: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public dataSource = new MatTableDataSource<any>();
  public displayedColumns: string[] =  [
    'TransactionId', 
    'TransactionType',
    'InsertedOn',
    'Amount',
    'CustomerName',
    'Status',
    'CardholderName'
  ];
  constructor() { }
  
  ngOnInit(): void{
      if(this.data){
        this.dataSource.data = this.data.transaction;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
  }
}
