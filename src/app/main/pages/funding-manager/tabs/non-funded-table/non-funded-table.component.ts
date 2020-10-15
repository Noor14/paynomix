import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-non-funded-table',
  templateUrl: './non-funded-table.component.html',
  styleUrls: ['./non-funded-table.component.scss']
})
export class NonFundedTableComponent implements OnInit, OnChanges {
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() nonFundedList: any;
  @Input() displayedColumns: string[] = [];

  constructor() { }

  ngOnInit(): void {
 
  }
  ngOnChanges(): void{
    if(this.nonFundedList.length){
      this.dataSource.data = this.nonFundedList;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

}
