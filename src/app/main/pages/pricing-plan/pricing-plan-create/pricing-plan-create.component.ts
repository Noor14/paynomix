import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { snackBarConfig } from 'constants/globalFunctions';
import { PricingPlanService } from '../pricing-plan.service';

@Component({
  selector: 'app-pricing-plan-create',
  templateUrl: './pricing-plan-create.component.html',
  styleUrls: ['./pricing-plan-create.component.scss']
})
export class PricingPlanCreateComponent implements OnInit {

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
      private readonly _router: Router
    ) { }

  ngOnInit(): void {}
  
  createPricingPlan(event: any){
    this._pricingPlanService.savePricingPlan(event)
    .then((res: any) => {
      if(res && !res.StatusCode){
        this._snackBar.open('Pricing plan created', '', snackBarConfig);
        this._router.navigate(['/pages/pricing-plan/pricing-plan-list']);

      }
  }).catch((err: HttpErrorResponse)=>(console.log))
  
  }

}
