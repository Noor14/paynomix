import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EmailDialogComponent } from '@fuse/components/email-dialog/email-dialog.component';

@Component({
  selector: 'app-merchant-table',
  templateUrl: './merchant-table.component.html',
  styleUrls: ['./merchant-table.component.scss']
})
export class MerchantTableComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns : string[] =  ['CompanyName', 'Reseller', 'FirstName', 'Email', 'Phone', 'BoardedDate', 'BoardingStatus', 'Action'];
  @Input() data: any;

  constructor(private readonly _dialog: MatDialog) { }

  ngOnInit(): void{
    if(this.data){
      this.dataSource.data = this.data.merchants;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  openDialog(value) {
    const obj:any = {
      SendTo: value.MerchantAccountSetup.MerchantEmail,
      Subject: value.EmailSubject,
      HtmlBodyContent: value.EmailBody,
      MerchantName: `${value.FirstName} ${value.LastName}`,
      PartnerId: value.PartnerId
    }
    const dialogRef = this._dialog.open(EmailDialogComponent, {width: '660px'});
    dialogRef.componentInstance.data = obj;
  } 
}
