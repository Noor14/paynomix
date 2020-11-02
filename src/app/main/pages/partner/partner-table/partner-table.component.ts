import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-partner-table',
  templateUrl: './partner-table.component.html',
  styleUrls: ['./partner-table.component.scss']
})
export class PartnerTableComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>()
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() data: any;
  public displayedColumns: string[] =  ['PartnerName', 'DBAName', 'FirstName', 'LastName'];
  
  constructor() { }

  ngOnInit(): void{
    if(this.data){
      this.dataSource.data = this.data.partners;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}
