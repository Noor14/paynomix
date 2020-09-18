import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { snackBarConfig } from '../../../../../constants/globalFunctions';
import { Subject } from 'rxjs';
import { PricingPlanService } from '../pricing-plan.service';
import { takeUntil, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-pricing-plan-edit',
  templateUrl: './pricing-plan-edit.component.html',
  styleUrls: ['./pricing-plan-edit.component.scss']
})
export class PricingPlanEditComponent implements OnInit, OnDestroy {

  public pricingPlanInfo: any = {};
  private _unsubscribeAll: Subject<any>;
  /**
     * Constructor
     *
     * @param {PricingPlanService} _pricingPlanService
     * @param {ActivatedRoute} _route
     * @param {MatSnackBar} _snackBar
     * @param {Router} _router
     */
  constructor(
    private readonly _route : ActivatedRoute,
    private readonly _pricingPlanService: PricingPlanService,

    private readonly _snackBar: MatSnackBar,
    private readonly _router: Router

  ) { 
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._route.paramMap
    .pipe(
      takeUntil(this._unsubscribeAll),
      map((param) => param.get('id')),
      switchMap((id) =>
        this._pricingPlanService.getPricingPlanDetail(id)
      ),
      tap((res: any) => (this.pricingPlanInfo = res.Response)),
    )
    .subscribe();
  }

  ngOnDestroy(): void{
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  
  updatePricingPlan(event){
    this._pricingPlanService.savePricingPlan(event)
    .then((res: any) => {
      if(res && !res.StatusCode){
        this._snackBar.open('Pricing plan updated', '', snackBarConfig);
        this._router.navigate(['/pages/pricing-plan/pricing-plan-list']);

      }
  }).catch((err: HttpErrorResponse)=>(console.log))
  
  }


}
