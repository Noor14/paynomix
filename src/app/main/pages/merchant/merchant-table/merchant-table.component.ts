import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { EmailDialogComponent } from '@fuse/components/email-dialog/email-dialog.component';
import { truncateTextLength } from '../../../../../constants/globalFunctions';

@Component({
  selector: 'app-merchant-table',
  templateUrl: './merchant-table.component.html',
  styleUrls: ['./merchant-table.component.scss'],
  animations   : fuseAnimations
})
export class MerchantTableComponent implements OnInit {
  public truncateTextLength = truncateTextLength;
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns : string[] =  ['Reseller', 'CompanyName', 'ContactPerson', 'Email', 'Phone', 'PricingTitle', 'BoardedDate', 'BoardingStatus'];
  @Input() data: any;
  public actionControlOnHover = -1;
  constructor(private readonly _dialog: MatDialog) { }

  ngOnInit(): void{
    if(this.data){
      this.dataSource.data = this.data.merchants;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  openDialog(obj) {
    const object:any = {
      SendTo: obj.MerchantAccountSetup.MerchantEmail,
      Subject: obj.EmailSubject,
      BodyContent: obj.EmailBody,
      MerchantName: `${obj.FirstName} ${obj.LastName}`,
      PartnerId: obj.PartnerId
    }
    const dialogRef = this._dialog.open(EmailDialogComponent, {width: '660px'});
    dialogRef.componentInstance.data = object;
  } 
}
