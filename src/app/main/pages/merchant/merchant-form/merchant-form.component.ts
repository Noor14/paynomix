import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserConfigService } from '@fuse/services/user.config.service';
import { snackBarConfigWarn } from 'constants/globalFunctions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResellerService } from '../../reseller/reseller.service';
import { MerchantService } from '../merchant.service';

@Component({
  selector: 'app-merchant-form',
  templateUrl: './merchant-form.component.html',
  styleUrls: ['./merchant-form.component.scss']
})
export class MerchantFormComponent implements OnInit, OnDestroy {

  public merchantBottomSheetInfo: object = Object.freeze({
    purpose: 'Please Select a Reseller',
    icon: 'device_hub',
    label: 'Search Reseller'
  });
  public bottomSheetDrawerOpen: boolean = false;
  public merchantInfoForm: FormGroup;
  public businessDetailForm: FormGroup;
  public ownerDetailForm: FormGroup;
  public bankAccountForm: FormGroup;
  @Input() merchantDetail: any = null;
  @Output() submitForm = new EventEmitter<any>();
  public boardingObject:any; 
  public resellers: any[] = [];
  private _unsubscribeAll: Subject<any>;
  public bottomSheetEnable: boolean = true;

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
    const user =  this._userConfigService.loggedInUser;
    if(user && user.hasOwnProperty('ResellerId')){
      this.onSelected(user.ResellerId);
      this.bottomSheetEnable = false;
    }
}

  ngOnInit(): void {
    this._cdref.detectChanges();
    if(this.bottomSheetEnable){
      this._userConfigService.userModeChange
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((userMode) => {
        if(!userMode || (userMode && !userMode.hasOwnProperty('ResellerId'))){
          this.getResellers();
        }else{
          this.onSelected(userMode.ResellerId)
          this.bottomSheetEnable = false;
        }
      })
    }
  }

  ngOnDestroy(): void{
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getResellers(): void{
    this._resellerService.resellerList(this._userConfigService.getUserMode())
    .then((res: any) => {
          if(res && !res.StatusCode && res.Response && res.Response.length){
          this.resellers = res.Response.map((item: any) => {
            return {
              id: item.ResellerId, 
              name: item.ResellerName
            };
          });
          if(!this.merchantDetail){
            this.bottomSheetDrawerOpen = true;
          }
      }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

  private createBoardingObject(): void{
    this.boardingObject = {
      ...{...this.merchantDetail, ...this.ownerDetailForm.value},
      MerchantBankAccount: (this.merchantDetail && this.merchantDetail.MerchantBankAccount)? {...this.merchantDetail.MerchantBankAccount, ...this.bankAccountForm.value} : {...this.bankAccountForm.value},
      MerchantAccountSetup: (this.merchantDetail && this.merchantDetail.MerchantAccountSetup)? {...this.merchantDetail.MerchantAccountSetup, ...this.merchantInfoForm.value}: {...this.merchantInfoForm.value},
      MerchantBusiness: (this.merchantDetail && this.merchantDetail.MerchantBusiness)? {...this.merchantDetail.MerchantBusiness, ...this.businessDetailForm.value}: {...this.businessDetailForm.value},
    };
  }
  stepChange(event: StepperSelectionEvent){
    if(event.selectedIndex == 4){
      this.createBoardingObject();
    }
  }

  onSelected(event: number): void{
    if(!this.merchantDetail){
      this.merchantDetail = {
        ResellerId : event,
        MerchantAccountSetup: {
        ResellerId : event,
        resetPricingPlan: (this.bottomSheetEnable)? true: false
        }
      };
    }else{
      this.merchantDetail.ResellerId = event;
      this.merchantDetail.MerchantAccountSetup.resetPricingPlan = (this.bottomSheetEnable)? true: false;
      this.merchantDetail.MerchantAccountSetup.ResellerId = this.merchantDetail.ResellerId;
      this.merchantDetail.MerchantAccountSetup = {...this.merchantDetail.MerchantAccountSetup};
    }

  }
  save(): void{
    this.createBoardingObject();
    this.submitForm.emit(this.boardingObject);
  }

}
