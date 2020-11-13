import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { truncateTextLength } from '../../../../../constants/globalFunctions';

@Component({
  selector: 'app-partner-table',
  templateUrl: './partner-table.component.html',
  styleUrls: ['./partner-table.component.scss'],
  animations   : fuseAnimations
})
export class PartnerTableComponent implements OnInit {
  public truncateTextLength = truncateTextLength ;
  public dataSource = new MatTableDataSource<any>()
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() data: any;
  public actionControlOnHover = -1;
  public displayedColumns: string[] =  ['PartnerName', 'DBAName', 'ContactPerson', 'Email', 'Phone'];
  
  constructor() { }

  ngOnInit(): void{
    if(this.data){
      this.dataSource.data = this.data.partners;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}
