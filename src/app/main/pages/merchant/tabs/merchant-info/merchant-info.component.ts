import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PricingPlanService } from 'app/main/pages/pricing-plan/pricing-plan.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { snackBarConfig, snackBarConfigWarn, validator } from '../../../../../../constants/globalFunctions';
import { MerchantService } from '../../merchant.service';

@Component({
  selector: 'app-merchant-info',
  templateUrl: './merchant-info.component.html',
  styleUrls: ['./merchant-info.component.scss']
})
export class MerchantInfoComponent implements OnInit, AfterViewInit, OnChanges {
  public pricingPlans: any[] = [];
  public merchantInfoForm: FormGroup;
  @Input() merchantInfo: any = null;
  @Output() stepOne = new EventEmitter<any>();
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

) {}

 ngOnInit(): void {
  this.createMerchantInfoForm();
  this.detectControlChanges()
 }

  ngOnChanges(): void{
    if(this.merchantInfo){
      if(!this.merchantInfoForm){
        this.createMerchantInfoForm();
        this.stepOne.emit(this.merchantInfoForm);
      }else{
        if(this.merchantInfo.AccountSetupId){
          this.merchantInfoForm.controls.MerchantEmail.disable();
        }
        this.merchantInfoForm.patchValue(this.merchantInfo);
      }
      this.getPricingPlans({ResellerId: this.merchantInfo.ResellerId});
    }
  }
 
  ngAfterViewInit(): void {
    this.stepOne.emit(this.merchantInfoForm);
  }

  detectControlChanges(): void{
    this.merchantInfoForm.get('MerchantUserName').valueChanges
    .pipe(
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
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe(res=> {
      if(res && res.match(validator.emailPattern) && !this.merchantInfo.MerchantEmail){
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
      if(res && !res.StatusCode){
        delete this.merchantInfoForm.controls.MerchantUserName.errors.notUnique;
      }else{
        this.merchantInfoForm.controls.MerchantUserName.setErrors({notUnique: true})
        this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn)
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
              this._snackBar.open('This reseller has no pricing plan yet', '', snackBarConfig);
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
      MerchantUserName: ['', Validators.required],
      MerchantEmail: [{value: '', disabled: false}, [Validators.required, Validators.email, Validators.pattern(validator.emailPattern)]],
      PricingPlanID: [{value: '', disabled: true}, Validators.required],
      PricingTitle: ['', Validators.required],
      IpAddress: ['192.168.0.142', Validators.required]
      });
  }

}
