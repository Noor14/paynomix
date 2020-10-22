import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent implements OnInit , OnChanges{
  @Input() data: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public dataSource = new MatTableDataSource<any>();
  public displayedColumns: string[] =  ['TransactionId', 'InsertedOn', 'Amount',
  'TransactionType','CardholderName',  'CustomerName', 'status', 'Action'];
  constructor() { }
  ngOnChanges(): void {
    if(this.data){
      this.dataSource.data = this.data.transaction;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  
  ngOnInit(): void{
    if(this.data){
      this.dataSource.data = this.data.transaction;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}
