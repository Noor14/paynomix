import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SlidingPanelService } from '@fuse/components/sliding-panel/sliding-panel.service';
import { snackBarConfig, snackBarConfigWarn } from 'constants/globalFunctions';
import { PricingPlanService } from '../pricing-plan.service';

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
      private _slidingPanelService:SlidingPanelService
    ) { }

  ngOnInit(): void {}
  
  createPricingPlan(event: any){
    this._pricingPlanService.savePricingPlan(event)
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
