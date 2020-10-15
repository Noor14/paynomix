import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-non-funded-table',
  templateUrl: './non-funded-table.component.html',
  styleUrls: ['./non-funded-table.component.scss']
})
export class NonFundedTableComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() data: any;
  public displayedColumns: string[] = ['PartnerName', 'TotalTransAmount', 'PaynomixFee', 'AdminCommission', 'PartnerCommision', 'ResellerCommision', 'Status', 'Action'];

  constructor() { }

  ngOnInit(): void {
    if(this.data){
      this.dataSource.data = this.data.nonFundedList;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

}
