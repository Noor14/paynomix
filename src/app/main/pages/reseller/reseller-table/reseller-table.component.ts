import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-reseller-table',
  templateUrl: './reseller-table.component.html',
  styleUrls: ['./reseller-table.component.scss'],
  animations   : fuseAnimations
})
export class ResellerTableComponent implements OnInit  {
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() data: any;
  public actionControlOnHover = -1;
  public displayedColumns: string[] = ['FirstName', 'LastName', 'ResellerName', 'DBAName', 'Email', 'TelephoneNumber', 'Country'];

  constructor() { }

  ngOnInit() : void{
    if(this.data){
      this.dataSource.data = this.data.resellers;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
  }

}
