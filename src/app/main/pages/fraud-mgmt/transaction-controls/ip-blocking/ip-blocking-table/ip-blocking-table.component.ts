import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { truncateTextLength } from 'constants/globalFunctions';

@Component({
  selector: 'app-ip-blocking-table',
  templateUrl: './ip-blocking-table.component.html',
  styleUrls: ['./ip-blocking-table.component.scss']
})
export class IpBlockingTableComponent implements OnInit {
  public truncateTextLength = truncateTextLength ;
  public dataSource = new MatTableDataSource<any>()
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() data: any;
  public actionControlOnHover = -1;
  public displayedColumns: string[] =  ['PartnerName', 'DBAName', 'ContactPerson'];
   /**
     * Constructor
     *
     * @param {ResellerService} _resellerService
     * @param {MatSnackBar} _snackBar
     * @param {MatDialog} _dialog
     */
  constructor() {
   }

  ngOnInit(): void{
    if(this.data){
      this.dataSource.data = this.data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}
