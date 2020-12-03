import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-plg-table',
  templateUrl: './plg-table.component.html',
  styleUrls: ['./plg-table.component.scss'],
  animations   : fuseAnimations

})
export class PlgTableComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>()
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() data: any;
  public actionControlOnHover = -1;
  public displayedColumns: string[] =  ['PartnerName', 'DBAName', 'ContactPerson', 'Email', 'Phone'];
 
  constructor() { }

  ngOnInit(): void {
    if(this.data){
      this.dataSource.data = this.data.partners;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

}
