import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { snackBarConfig, snackBarConfigWarn } from '../../../../../../constants/globalFunctions';
import { FundManagerService } from '../../funding-manager.service';

@Component({
  selector: 'app-non-funded-table',
  templateUrl: './non-funded-table.component.html',
  styleUrls: ['./non-funded-table.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class NonFundedTableComponent implements OnInit {
  @ViewChild('fundDialog', {static: false}) fundDialog: any;
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() data: any;
  public displayedColumns: string[] = ['PartnerName', 'TotalTransAmount', 'PaynomixFee', 'AdminCommission', 'PartnerCommision', 'ResellerCommision', 'Status', 'Action'];
  public selectedToFund: any;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _fundManagerService: FundManagerService,
    private readonly _snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    if(this.data){
      this.dataSource.data = this.data.nonFundedList;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  openDialogToFund(obj: any): void{
    this.selectedToFund = obj;
    this._dialog.open(this.fundDialog, {width: '550px'});
  }

  fundNow(): void{
    const {PartnerId} = this.selectedToFund;
    this._fundManagerService.fundTransfer({PartnerId})
    .then((res: any) => {
        if(res && !res.StatusCode){
          console.log(res);
          this._snackBar.open('Amount funded successfully', '', snackBarConfig);
        }else{
          this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn);
        }
    }).catch((err: HttpErrorResponse)=>(console.log));
  }


}
