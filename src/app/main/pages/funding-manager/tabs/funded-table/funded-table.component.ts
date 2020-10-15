import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-funded-table',
  templateUrl: './funded-table.component.html',
  styleUrls: ['./funded-table.component.scss']
})
export class FundedTableComponent implements OnInit, OnChanges {
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() fundedList: any;
  @Input() displayedColumns: string[] = [];
  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(): void{
    if(this.fundedList.length){
      this.dataSource.data = this.fundedList;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}
