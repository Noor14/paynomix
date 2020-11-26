import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PricingPlanService } from 'app/main/pages/pricing-plan/pricing-plan.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import * as globalConfig from '../../../../../../constants/globalFunctions';
import { MerchantService } from '../../merchant.service';
@Component({
  selector: 'app-merchant-info',
  templateUrl: './merchant-info.component.html',
  styleUrls: ['./merchant-info.component.scss']
})
export class MerchantInfoComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  public pricingPlans: any[] = [];
  public merchantInfoForm: FormGroup;
  public globalConfig = globalConfig;
  @Input() merchantInfo: any = null;
  @Output() stepOne = new EventEmitter<any>();
  private _unsubscribeAll: Subject<any>;

   /**
    * Constructor
    *
    * @param {FormBuilder} _formBuilder
    * @param {MatSnackBar} _snackBar
    * @param {MerchantService} _merchantService
    * @param {PricingPlanService} _pricingPlanService
    * 
    */
   
   constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _pricingPlanService: PricingPlanService,
    private readonly _merchantService: MerchantService,
    private readonly _snackBar: MatSnackBar

) {
   // Set the private defaults
   this._unsubscribeAll = new Subject();
}

 ngOnInit(): void {
  this.createMerchantInfoForm();
 }

  ngOnChanges(): void{
    if(this.merchantInfo){
      if(!this.merchantInfoForm){
        this.createMerchantInfoForm();
        this.stepOne.emit(this.merchantInfoForm);
      }
        if(this.merchantInfo.AccountSetupId){
          this.merchantInfoForm.controls.MerchantEmail.disable();
        }
        this.merchantInfoForm.patchValue(this.merchantInfo);
      this.getPricingPlans({ResellerId: this.merchantInfo.ResellerId});
    }
  }
 
  ngAfterViewInit(): void {
    this.stepOne.emit(this.merchantInfoForm);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  detectControlChanges(): void{
    this.merchantInfoForm.get('MerchantUserName').valueChanges
    .pipe(
      takeUntil(this._unsubscribeAll),
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe(res=> {
      if(res && !this.merchantInfo.MerchantUserName){
        this.verifyMerchantExist();
      }else if(res && this.merchantInfo.MerchantUserName != res ){
        this.verifyMerchantExist();
      }
    });

    this.merchantInfoForm.get('MerchantEmail').valueChanges
    .pipe(
      takeUntil(this._unsubscribeAll),
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe(res=> {
      if(res && res.match(globalConfig.validator.emailPattern) && !this.merchantInfo.MerchantEmail){
        this.verifyMerchantExist();
      }
    });
  }


  verifyMerchantExist(){
    const obj = {
      MerchantUserName: this.merchantInfoForm.controls.MerchantUserName.value,
      Email: (this.merchantInfo && this.merchantInfo.AccountSetupId)? '': this.merchantInfoForm.controls.MerchantEmail.value,
    };
   this._merchantService.verifyMerchant(obj)
    .then((res: any) => {
      if (res && !res.StatusCode) {
        if (res.Response.ismerchantnameexist) {
          this.merchantInfoForm.controls['MerchantUserName'].setErrors({'notUnique': true });
          this._snackBar.open(res.Response.message, '', globalConfig.snackBarConfigWarn);
        }
        if (res.Response.isemailexist) {
          this.merchantInfoForm.controls['MerchantEmail'].setErrors({'notUnique': true });
          this._snackBar.open(res.Response.message, '', globalConfig.snackBarConfigWarn);
        }
      }else{
        this._snackBar.open(res.StatusMessage, '', globalConfig.snackBarConfigWarn)
      }
  }).catch((err: HttpErrorResponse)=>(console.log))
  }

  getPricingPlans(obj): void{
    this._pricingPlanService.pricingPlanList(obj)
    .then((res: any) => {
        if(res && !res.StatusCode && res.Response){
            const control = this.merchantInfoForm.controls.PricingPlanID as AbstractControl;
            if(this.merchantInfo.resetPricingPlan){
              control.reset();
            }
            if(res.Response.length){
              control.enable();
            }else{
              this._snackBar.open('This reseller has no pricing plan yet', '', globalConfig.snackBarConfigWarn);
              control.disable();
              this.merchantInfoForm.controls.PricingTitle.reset();
            }  
            this.pricingPlans = res.Response;
        }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

  setPricingPlanName(): void{
    const id = this.merchantInfoForm.controls.PricingPlanID.value;
    const title = this.pricingPlans.find(item=> item.PricingPlanID == id).PricingTitle;
    this.merchantInfoForm.controls.PricingTitle.setValue(title);
  }

  createMerchantInfoForm(): void{
    this.merchantInfoForm = this._formBuilder.group({
      AccountSetupId: [0, Validators.required],
      MerchantUserName: ['', [Validators.required, Validators.maxLength(globalConfig.validator.maxFieldLength)]],
      MerchantEmail: [{value: '', disabled: false}, [Validators.required, Validators.email, Validators.pattern(globalConfig.validator.emailPattern)]],
      PricingPlanID: [{value: '', disabled: true}, Validators.required],
      PricingTitle: ['', Validators.required],
      IpAddress: ['192.168.0.142', Validators.required]
      });
    this.detectControlChanges();
  }

}
