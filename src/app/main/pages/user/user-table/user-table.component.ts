import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public dataSource = new MatTableDataSource<any>();
  @Input() data: any;
  public displayedColumns: string[] =  ['FirstName', 'LastName', 'Username', 'Phone', 'Role', 'LastLogin', 'Action'];
  constructor() { }

  ngOnInit(): void{
    if(this.data){
      this.dataSource.data = this.data.users;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}
