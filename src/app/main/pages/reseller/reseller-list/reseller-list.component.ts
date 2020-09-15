import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserConfigService } from '@fuse/services/user.config.service';
import { ResellerService } from '../reseller.service';

@Component({
  selector: 'app-reseller-list',
  templateUrl: './reseller-list.component.html',
  styleUrls: ['./reseller-list.component.scss']
})
export class ResellerListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns = ['resellerName', 'DBAName', 'TelephoneNumber', 'Email','Country', 'Action'];
  public dataSource = new MatTableDataSource<any>(
    [
      {resellerName: 1, DBAName: 'Hydrogen', TelephoneNumber: 1.0079,  Email: 'H' ,Country:'usa'},
      {resellerName: 2, DBAName: 'Helium', TelephoneNumber: 4.0026,  Email: 'He',Country:'usa'},
      {resellerName: 3, DBAName: 'Lithium', TelephoneNumber: 6.941,  Email: 'Li',Country:'usa'},
      {resellerName: 4, DBAName: 'Beryllium', TelephoneNumber: 9.0122,  Email: 'Be',Country:'usa'},
      {resellerName: 5, DBAName: 'Boron', TelephoneNumber: 10.811,  Email: 'B',Country:'usa'},
      {resellerName: 6, DBAName: 'Carbon', TelephoneNumber: 12.0107,  Email: 'C',Country:'usa'},
      {resellerName: 7, DBAName: 'Nitrogen', TelephoneNumber: 14.0067,  Email: 'N',Country:'usa'},
      {resellerName: 8, DBAName: 'Oxygen', TelephoneNumber: 15.9994,  Email: 'O',Country:'usa'},
      {resellerName: 9, DBAName: 'Fluorine', TelephoneNumber: 18.9984,  Email: 'F',Country:'usa'},
      {resellerName: 10, DBAName: 'Neon', TelephoneNumber: 20.1797,  Email: 'Ne',Country:'usa'},
      {resellerName: 11, DBAName: 'Sodium', TelephoneNumber: 22.9897,  Email: 'Na',Country:'usa'},
      {resellerName: 12, DBAName: 'Magnesium', TelephoneNumber: 24.305,  Email: 'Mg',Country:'usa'},
      {resellerName: 13, DBAName: 'Aluminum', TelephoneNumber: 26.9815,  Email: 'Al',Country:'usa'},
      {resellerName: 14, DBAName: 'Silicon', TelephoneNumber: 28.0855,  Email: 'Si',Country:'usa'},
      {resellerName: 15, DBAName: 'Phosphorus', TelephoneNumber: 30.9738,  Email: 'P',Country:'usa'},
      {resellerName: 16, DBAName: 'Sulfur', TelephoneNumber: 32.065,  Email: 'S',Country:'usa'},
      {resellerName: 17, DBAName: 'Chlorine', TelephoneNumber: 35.453,  Email: 'Cl',Country:'usa'},
      {resellerName: 18, DBAName: 'Argon', TelephoneNumber: 39.948,  Email: 'Ar',Country:'usa'},
      {resellerName: 19, DBAName: 'Potassium', TelephoneNumber: 39.0983,  Email: 'K',Country:'usa'},
      {resellerName: 20, DBAName: 'Calcium', TelephoneNumber: 40.078,  Email: 'Ca',Country:'usa'},
    ])
  constructor() { }

  ngOnInit(): void {
    this._userConfigService.userModeChange.subscribe(() => this.getReseller())

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getReseller(): void{
    this._resellerService.resellerList(this._userConfigService.getUserMode()).then((res: any) =>{
        if(res && !res.StatusCode){
            console.log(res)
        }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

}
