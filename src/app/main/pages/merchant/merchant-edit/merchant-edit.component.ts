import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { snackBarConfig, snackBarConfigWarn } from '../../../../../constants/globalFunctions';
import { Subject } from 'rxjs';
import { takeUntil, map, switchMap, tap } from 'rxjs/operators';
import { MerchantService } from '../merchant.service';

@Component({
  selector: 'app-merchant-edit',
  templateUrl: './merchant-edit.component.html',
  styleUrls: ['./merchant-edit.component.scss']
})
export class MerchantEditComponent implements OnInit, OnDestroy {
  public onBoardError: string = undefined;
  public merchantDetail: any = {};
  private _unsubscribeAll: Subject<any>;
 /**
     * Constructor
     *
     * @param {MerchantService} _merchantService
     * @param {ActivatedRoute} _route
     * @param {MatSnackBar} _snackBar
     * @param {Router} _router
     */
  constructor(
    private readonly _route : ActivatedRoute,
    private readonly _merchantService: MerchantService,
    private readonly _snackBar: MatSnackBar,
    private readonly _router: Router
  )
  { 
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._route.paramMap
    .pipe(
      takeUntil(this._unsubscribeAll),
      map((param) => param.get('id')),
      switchMap((id) =>
        this._merchantService.getMerchantDetail(id)
      ),
      tap((res: any) => {
        this.merchantDetail = res.Response;
        this.merchantDetail.MerchantAccountSetup.ResellerId = this.merchantDetail.ResellerId;
        this.merchantDetail.MerchantAccountSetup.resetPricingPlan = false;
      }),
    )
    .subscribe();

  }
  ngOnDestroy(): void{
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  updateMerchant(event: any): void{
    this.onBoardError = undefined;
    this._merchantService.saveMerchant(event)
    .then((res: any) => {
      if(res && !res.StatusCode){
        this._snackBar.open('Merchant updated', '', snackBarConfig);
        this._router.navigate(['/pages/merchant/merchant-list']);
      }else{
        this.onBoardError = (res.Response)? `${res.StatusMessage}: ${res.Response}`: res.StatusMessage;
        this._snackBar.open(this.onBoardError, '', snackBarConfigWarn);
      }
  }).catch((err: HttpErrorResponse)=>(console.log))
  }
}
