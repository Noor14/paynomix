import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { EmailDialogComponent } from '@fuse/components/email-dialog/email-dialog.component';
import { truncateTextLength } from '../../../../../constants/globalFunctions';
import { UserConfigService } from '@fuse/services/user.config.service';
import { MerchantService } from '../merchant.service';

@Component({
  selector: 'app-merchant-table',
  templateUrl: './merchant-table.component.html',
  styleUrls: ['./merchant-table.component.scss'],
  animations   : fuseAnimations
})
export class MerchantTableComponent implements OnInit {
  public truncateTextLength = truncateTextLength;
  public recordCount: number = 0;

  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
 
  public displayedColumns : string[] =  ['Reseller', 'CompanyName', 'ContactPerson', 'Email', 'PricingTitle', 'BoardedDate', 'BoardingStatus'];
  @Input() data: any;
  public actionControlOnHover = -1;
  constructor(private readonly _dialog: MatDialog,
    private readonly _userConfigService: UserConfigService,
    private readonly _merchantService: MerchantService,) { }
  

  ngOnInit(): void{
    if(this.data){
      this.dataSource.data = this.data.merchants;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngAfterViewInit(): void{
    setTimeout(() =>  this.recordCount = 2000, 0);
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

  changePage(event){ 
    const obj = {
      RecordLimit: event.pageSize,
      PageNo: ++event.pageIndex,
      ...this._userConfigService.getUserMode()
    };
    this._merchantService.merchantList(obj)
    .then((res: any) => {
      if (res && !res.StatusCode) {
        if (res.Response ) {
          this.dataSource = res.Response;
        }
      }
    }).catch(() => (console.log))


  }
}
