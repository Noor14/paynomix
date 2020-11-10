import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { MatSnackBar} from '@angular/material';
import { snackBarConfig } from 'constants/globalFunctions';
import { ResellerService } from '../reseller.service';

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
  public displayedColumns: string[] = ['ResellerName', 'DBAName', 'TelephoneNumber', 'Email', 'Country'];

  constructor(
    private readonly _resellerService: ResellerService,
    private _snacksBar: MatSnackBar
  ) { }

  ngOnInit() : void{
    if(this.data){
      this.dataSource.data = this.data.resellers;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
  }

  resendEmail(obj) {
    let resID = {"ResellerId" : obj}
    this._resellerService.resendCredentials(resID).then((res:any) => {
      if(res.StatusCode == 0) {
    this._snackBar.open('Your credentials have been successfully Sent', '', snackBarConfig);
    } 
  });

}

}