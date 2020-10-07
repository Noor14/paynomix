import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResellerService } from '../../reseller/reseller.service';

@Component({
  selector: 'app-merchant-form',
  templateUrl: './merchant-form.component.html',
  styleUrls: ['./merchant-form.component.scss']
})
export class MerchantFormComponent implements OnInit, OnDestroy {

  public merchantInfoForm: FormGroup;
  public businessDetailForm: FormGroup;
  public ownerDetailForm: FormGroup;
  public bankAccountForm: FormGroup;
  @Input() merchantDetail: any = null;
  @Output() submitForm = new EventEmitter<any>();
  public boardingObject:any; 
  public resellers: any[] = [];
  private _unsubscribeAll: Subject<any>;

   /**
    * Constructor
    *
    * @param {ResellerService} _resellerService
    * @param {UserConfigService} _userConfigService
    * @param {ChangeDetectorRef} _cdref
    * 
    */
   
   constructor(
    private readonly _resellerService: ResellerService,
    private readonly _userConfigService: UserConfigService,
    private readonly _cdref: ChangeDetectorRef,

) { 
          // Set the private defaults
          this._unsubscribeAll = new Subject();
}

  ngOnInit(): void {
    this._cdref.detectChanges();
    this._userConfigService.userModeChange
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(() => this.getResellers())
  
  }
  ngOnDestroy(): void{
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  getResellers(): void{
    debugger;
    this._resellerService.resellerList(this._userConfigService.getUserMode())
    .then((res: any) => {
      debugger;
          if(res && !res.StatusCode && res.Response && res.Response.length){
            debugger;
          this.resellers = res.Response.map((item: any) => {
            debugger;
            return {
              id: item.ResellerId, 
              name: item.ResellerName
            };
          });
      }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }
  private createBoardingObject(): void{
    this.boardingObject = {
      ...{...this.merchantDetail, ...this.ownerDetailForm.value},
      MerchantBankAccount: (this.merchantDetail && this.merchantDetail.MerchantBankAccount)? {...this.merchantDetail.MerchantBankAccount, ...this.bankAccountForm.value} : {...this.bankAccountForm.value},
      MerchantAccountSetup: (this.merchantDetail && this.merchantDetail.MerchantAccountSetup)? {...this.merchantDetail.MerchantAccountSetup, ...this.merchantInfoForm.value}: {...this.merchantInfoForm.value},
      MerchantBusiness: (this.merchantDetail && this.merchantDetail.MerchantBusiness)? {...this.merchantDetail.MerchantBusiness, ...this.businessDetailForm.value}: {...this.businessDetailForm.value},
    }
  }
  stepChange(event: MatStepper): void{
    if(event.selectedIndex == 4){
      this.createBoardingObject();
    }
  }

  save(): void{
    this.createBoardingObject();
    this.submitForm.emit(this.boardingObject);
  }

}
