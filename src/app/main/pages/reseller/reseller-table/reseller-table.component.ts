import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
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
  public dialogRef : any;
  public ResellerData : any;
  public displayedColumns: string[] = ['ResellerName', 'DBAName', 'TelephoneNumber', 'Email', 'Country'];
  @ViewChild('confirmDialog', { static: false }) confirmDialog: any;


  constructor(
    private readonly _resellerService: ResellerService,
    private _snacksBar: MatSnackBar,
    private readonly _dialog: MatDialog,
  ) { }

  ngOnInit() : void{
    if(this.data){
      this.dataSource.data = this.data.resellers;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
  }


  openDialog(data): void { 
    this.dialogRef = this._dialog.open(this.confirmDialog, {width: '660px'});
    this.ResellerData = data
    console.log(this.ResellerData)
  }


  resendEmail() {
    let resID = {"ResellerId" : this.ResellerData.ResellerId}
    this._resellerService.resendCredentials(resID).then((res:any) => {
      if(res.StatusCode == 0) {
    this._snacksBar.open('Your credentials have been successfully Sent', '', snackBarConfig);
    this.dialogRef.close();
    } 
  });

}

}