import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FundManagerService } from '../funding-manager.service';

@Component({
  selector: 'app-funding-list',
  templateUrl: './funding-list.component.html',
  styleUrls: ['./funding-list.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class FundingListComponent implements OnInit, OnDestroy {


  public displayedColumns = ['PartnerName', 'TotalTransAmount', 'PaynomixFee', 'AdminCommission', 'PartnerCommision', 'ResellerCommision', 'Status', 'Action'];
  public fundsList: any = [];
  private _unsubscribeAll: Subject<any>;
  
      /**
      * Constructor
      *
      * @param {PartnerService} _fundManagerService
      * @param {UserConfigService} _userConfigService
      */
     
     constructor(
       private readonly _fundManagerService: FundManagerService,
       private readonly _userConfigService: UserConfigService
   ) { 
             // Set the private defaults
             this._unsubscribeAll = new Subject();
   }

   ngOnInit(): void {
    this._userConfigService.userModeChange
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(() => this.getFundingList())
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getFundingList(): void{
    this._fundManagerService.fundingList(this._userConfigService.getUserMode())
    .then((res: any) => {
        if(res && !res.StatusCode){
            this.fundsList = res.Response;
        }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

}
