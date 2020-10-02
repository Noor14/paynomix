import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PricingPlanService } from 'app/main/pages/pricing-plan/pricing-plan.service';
import { validator } from 'constants/globalFunctions';

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
    * @param {PricingPlanService} _pricingPlanService
    * 
    */
   
   constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _pricingPlanService: PricingPlanService,

) {}

 ngOnInit(): void {
  this.createMerchantInfoForm();
 }

  ngOnChanges(): void{
    if(this.merchantInfo){
      this.createMerchantInfoForm();
      this.getPricingPlans({ResellerId: this.merchantInfo.ResellerId});
      this.merchantInfoForm.patchValue(this.merchantInfo);
      this.stepOne.emit(this.merchantInfoForm);
    }
  }
 
  ngAfterViewInit(): void {
    this.stepOne.emit(this.merchantInfoForm);
  }

  getPricingPlans(obj): void{
    this._pricingPlanService.pricingPlanList(obj)
    .then((res: any) => {
        if(res && !res.StatusCode){
            this.pricingPlans = res.Response;
        }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }
  createMerchantInfoForm(): void{
    this.merchantInfoForm = this._formBuilder.group({
      AccountSetupId: [0, Validators.required],
      MerchantUserName: ['', Validators.required],
      MerchantEmail: ['', [Validators.required, Validators.email, Validators.pattern(validator.emailPattern)]],
      PricingPlanID: [{value: '', disabled: (!this.merchantInfo || (this.merchantInfo && !this.merchantInfo.ResellerId))}, Validators.required],
      IpAddress: ['192.168.0.142', Validators.required]
      });
  }
}
