import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { OverlayLockService } from '@fuse/components/overlay-lock/overlay-lock.service';

import { UserConfigService } from '@fuse/services/user.config.service';
import { FraudMgmtService } from '../../fraud-mgmt.service';
import { TransactionControlsService } from '../transaction-controls.service';



@Component({
  selector: 'app-country-origin',
  templateUrl: './country-origin.component.html',
  styleUrls: ['./country-origin.component.scss']
})
export class CountryOriginComponent implements OnInit {
   
     public ipAddress: any[] = [];
  public data:any;
  public lockingDetails: any;
  public updateIpAddress:any;
  public fraudTypeLock : any;
  @Input() fraudType : any;
   

  constructor(
    private readonly _userConfigService: UserConfigService,
    private readonly _fraudManagementService: FraudMgmtService,
    private readonly _transactionControlsService: TransactionControlsService,
    private readonly _overlayLockService: OverlayLockService
  ) { }

  ngOnInit() {

    if(this.fraudType == 1) {
      this.fraudTypeLock = this.fraudType;
      console.log();
      this.getLockSettings(this.fraudTypeLock);

    }
  }

  getLockSettings(obj?) : any 
  {
    this._fraudManagementService.lockSettings({...this._userConfigService.getUserMode(), FraudTypeId: obj})
    .then((res:any)=> {
      if(res && !res.StatusCode) {
       this.lockingDetails = res.Response[0];
     //  this._overlayLockService.getOverLay('overlay-country').toggleOpen();
      }
    })
  }



}
