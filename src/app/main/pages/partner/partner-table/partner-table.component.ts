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
import { UserConfigService } from '@fuse/services/user.config.service';
import { PartnerService } from '../partner.service';

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
  public recordCount: number = 0;
  public actionControlOnHover = -1;
  public displayedColumns: string[] =  ['PartnerName', 'DBAName', 'ContactPerson', 'Email', 'Phone'];
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
    private readonly _userConfigService: UserConfigService,
    private readonly _partnerService: PartnerService,
  ) { }

  ngOnInit(): void{
    if(this.data){
      this.dataSource.data = this.data.partners;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  ngAfterViewInit(): void{
    //console.log(this.data);
    setTimeout(() =>  this.recordCount = 100, 0);
  }


  openDialog(id): void { 
    const dialogRef = this._dialog.open(FuseConfirmDialogComponent, {width: '550px'});
    dialogRef.componentInstance.data={
      title: "Resend Welcome Email",
      message:"Are you sure you want to resend welcome email?"
    }
    dialogRef.afterClosed().subscribe((result)=>{
      if (result){
        this.resendEmail(id);
      }
    })
  
  }

  resendEmail(id) {
    this._settingService.resendCredentials({PartnerId : id}).then((res:any) => {
      if(res && !res.StatusCode){
       this._snackBar.open('Your credentials have been successfully sent', '', snackBarConfig);
     } 
  }).catch((err: HttpErrorResponse)=>(console.log));

}
changePage(event){ 
  const obj = {
    RecordLimit: event.pageSize,
    PageNo: ++event.pageIndex,
    ...this._userConfigService.getUserMode()
  };
  this._partnerService.partnerList(obj)
  .then((res: any) => {
    if (res && !res.StatusCode) {
      if (res.Response ) {
        this.dataSource.data = res.Response;
      }
    }
  }).catch(() => (console.log))


}
}
