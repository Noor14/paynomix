import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-merchant-table',
  templateUrl: './merchant-table.component.html',
  styleUrls: ['./merchant-table.component.scss']
})
export class MerchantTableComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns : string[] =  ['CompanyName', 'Reseller', 'FirstName', 'Email', 'Phone', 'BoardedDate', 'BoardingStatus', 'Action'];
  @Input() data: any;

  constructor() { }

  ngOnInit(): void{
    if(this.data){
      this.dataSource.data = this.data.merchants;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  } 
}
