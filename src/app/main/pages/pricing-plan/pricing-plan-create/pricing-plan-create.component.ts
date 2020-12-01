import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SlidingPanelService } from '@fuse/components/sliding-panel/sliding-panel.service';
import { snackBarConfig, snackBarConfigWarn } from 'constants/globalFunctions';
import { PricingPlanService } from '../pricing-plan.service';
import { UserConfigService } from '@fuse/services/user.config.service';

@Component({
  selector: 'app-pricing-plan-create',
  templateUrl: './pricing-plan-create.component.html',
  styleUrls: ['./pricing-plan-create.component.scss']
})
export class PricingPlanCreateComponent implements OnInit {
  @Output() isClosed = new EventEmitter<any>();
      /**
     * Constructor
     *
     * @param {PartnerService} _pricingPlanService
     * @param {MatSnackBar} _snackBar
     * @param {Router} _router
     */
    
    constructor(
      private readonly _pricingPlanService: PricingPlanService,
      private readonly _snackBar: MatSnackBar,
      private readonly _router: Router,
      private _slidingPanelService:SlidingPanelService,
      private readonly _userConfigService: UserConfigService,
    ) { }

  ngOnInit(): void {}
  
  createPricingPlan(event: any){
    const checkForUserRole = this._userConfigService.getUserMode();
    const roleObject = (checkForUserRole) ? checkForUserRole : { EntityId: 0, UserRoleId: 1 }
    const obj ={
      ...roleObject,
      ...event
    }
    this._pricingPlanService.savePricingPlan(obj)
    .then((res: any) => {
      if(!res.StatusCode){
        this._snackBar.open('Pricing plan created', '', snackBarConfig);
        this.closeSlidingPanel();
        this._slidingPanelService.setSlidingPanelStatus(true);
      }else{
        this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn);
      }
      
  }).catch((err: HttpErrorResponse)=>(console.log))
  
  }
  closeSlidingPanel(): void {
    this._slidingPanelService.closeSlidingPanel('slidePanel').toggleOpen();
  }
}
