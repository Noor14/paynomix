import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { truncateTextLength } from '../../../../../../constants/globalFunctions';

@Component({
  selector: 'app-funded-table',
  templateUrl: './funded-table.component.html',
  styleUrls: ['./funded-table.component.scss'],
  animations   : fuseAnimations
})
export class FundedTableComponent implements OnInit {
  public truncateTextLength = truncateTextLength
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() data: any;
  public actionControlOnHover = -1;
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
