import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns = ['BusinessTitle','FirstName', 'Reseller','Email','Phone','BoardedDate','BoardingStatus', 'action'];
  public dataSource = new MatTableDataSource<any>(
    [
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      {BoardingStatus: 1, BusinessTitle: 'depooot',FirstName:'jawad', Reseller:'json' ,Email:'json@Email.com', Phone:'12312223465',BoardedDate:'9/14/2020'},
      
     
    ])
  constructor() { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
