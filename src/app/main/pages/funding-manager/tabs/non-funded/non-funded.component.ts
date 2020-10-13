import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-non-funded',
  templateUrl: './non-funded.component.html',
  styleUrls: ['./non-funded.component.scss']
})
export class NonFundedComponent implements OnInit, OnChanges {
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
