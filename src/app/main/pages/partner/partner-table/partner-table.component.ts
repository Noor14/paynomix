import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { MatSnackBar} from '@angular/material';
import { snackBarConfig } from 'constants/globalFunctions';
import { PartnerService } from '../partner.service';


@Component({
  selector: 'app-partner-table',
  templateUrl: './partner-table.component.html',
  styleUrls: ['./partner-table.component.scss'],
  animations   : fuseAnimations
})
export class PartnerTableComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>()
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() data: any;
  public actionControlOnHover = -1;
  public displayedColumns: string[] =  ['PartnerName', 'DBAName', 'FirstName', 'LastName'];
  public PartnerData: any;
  public dialogRef : any;

  @ViewChild('confirmDialog', { static: false }) confirmDialog: any;
 
  
  constructor(
    private readonly _partnerService: PartnerService,
    private _snacksBar: MatSnackBar,
    private readonly _dialog: MatDialog,
  ) { }

  ngOnInit(): void{
    if(this.data){
      this.dataSource.data = this.data.partners;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }


  openDialog(data): void { 
    this.dialogRef = this._dialog.open(this.confirmDialog, {width: '660px'});
    this.PartnerData = data
    console.log(this.PartnerData)
  }


  resendEmail() {
    let resID = {"PartnerId" : this.PartnerData.PartnerId}
    this._partnerService.resendCredentials(resID).then((res:any) => {
      if(res.StatusCode == 0) {
    this._snacksBar.open('Your credentials have been successfully Sent', '', snackBarConfig);
    this.dialogRef.close();
    } 
  });

}


  


}
