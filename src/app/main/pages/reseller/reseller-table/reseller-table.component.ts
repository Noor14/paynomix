import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { snackBarConfig, truncateTextLength } from '../../../../../constants/globalFunctions';
import { SettingService } from '../../settings/settings.service';

@Component({
  selector: 'app-reseller-table',
  templateUrl: './reseller-table.component.html',
  styleUrls: ['./reseller-table.component.scss'],
  animations   : fuseAnimations
})
export class ResellerTableComponent implements OnInit  {
  public truncateTextLength = truncateTextLength;
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() data: any;
  public actionControlOnHover = -1;
  public displayedColumns: string[] = ['PartnerName', 'ResellerName', 'ContactPerson', 'Email', 'TelephoneNumber'];
   /**
     * Constructor
     *
     * @param {ResellerService} _resellerService
     * @param {MatSnackBar} _snackBar
     * @param {MatDialog} _dialog
     */
  constructor(
    private readonly _dialog: MatDialog,
    private readonly _snackBar: MatSnackBar,
    private readonly _settingService: SettingService,

  ) { }

  ngOnInit() : void{
    if(this.data){
      this.dataSource.data = this.data.resellers;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
  }

  openDialog(id): void { 
    const dialogRef = this._dialog.open(FuseConfirmDialogComponent, {width: '550px'});
    dialogRef.componentInstance.data={
      title: "Send Credentials",
      message:"Are you sure, You want to send the credentials?"
    }
    dialogRef.afterClosed().subscribe((result)=>{
      if (result){
        this.resendEmail(id);
      }
    })
  }

  resendEmail(id) {
    this._settingService.resendCredentials({ResellerId : id}).then((res:any) => {
      if(res && !res.StatusCode){
       this._snackBar.open('Your credentials have been successfully sent', '', snackBarConfig);
     } 
  }).catch((err: HttpErrorResponse)=>(console.log));

}

}
