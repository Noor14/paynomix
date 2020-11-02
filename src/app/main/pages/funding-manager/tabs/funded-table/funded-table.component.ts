import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-funded-table',
  templateUrl: './funded-table.component.html',
  styleUrls: ['./funded-table.component.scss']
})
export class FundedTableComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() data: any;
  public displayedColumns: string[] = ['PartnerName', 'TotalTransAmount', 'PaynomixFee', 'AdminCommission', 'PartnerCommision', 'ResellerCommision', 'Status'];
  
  constructor() { }

  ngOnInit(): void {
    if(this.data){
      this.dataSource.data = this.data.fundedList;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

}
