import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validateAllFormFields, validator } from '../../../../../constants/globalFunctions';

@Component({
  selector: 'app-pricing-plan-form',
  templateUrl: './pricing-plan-form.component.html',
  styleUrls: ['./pricing-plan-form.component.scss']
})
export class PricingPlanFormComponent implements OnInit, OnChanges, AfterViewInit {

  public maxPercentage = validator.maxPercentage;
  public pricngPlanForm: FormGroup;
  @Output() submitForm = new EventEmitter<any>();
  @Input() pricingPlanDetail: any = null;
    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
      private _formBuilder: FormBuilder,
      private readonly _cdref: ChangeDetectorRef,
  ) { }
  
  ngOnInit(): void{ 
    this.createPricingPlanForm();
  }
  
  ngOnChanges(){
    if(this.pricingPlanDetail){
      if(!this.pricngPlanForm){
        this.createPricingPlanForm();
      }
      this.pricngPlanForm.patchValue(this.pricingPlanDetail)
    }
  }
  ngAfterViewInit(): void {
    this._cdref.detectChanges();
    if(this.pricingPlanDetail) {
      this.pricngPlanForm.patchValue(this.pricingPlanDetail);
    }
  }
  createPricingPlanForm(): void{
    this.pricngPlanForm = this._formBuilder.group({
      PricingPlanID: [0, Validators.required],
      PricingTitle: ['', Validators.required],     
      Description: ['', Validators.required],
      Reserve: [0, [Validators.required, Validators.max(this.maxPercentage)]],
      DiscountRate: [0, [Validators.required, Validators.max(this.maxPercentage)]],
      AuthFee: [0, Validators.required],
      ChargeBack: [0, Validators.required],
      RetrievalFee: [0, Validators.required],
      MonthlyMinimunFee: [0, Validators.required],
      MonthlyStatementFee: [0, Validators.required],
      ApplicationSetupFee: [0, Validators.required],
      WireTransferFee: [0, Validators.required],
      GateWaySetupFee: [0, Validators.required],
      GateWayMonthlyAccess: [0, Validators.required],
      PerTransactionFee: [0, Validators.required],
      PricingPlanType: ['', Validators.required],
      FeeAmount: [0, Validators.required],
      OtherFee: [0, Validators.required],
      TransactionFee: [0, [Validators.required, Validators.max(this.maxPercentage)]],
      });
  }
  submit(){
    if(this.pricngPlanForm.valid){
      this.submitForm.emit(this.pricngPlanForm.value);
    }else{
     validateAllFormFields(this.pricngPlanForm)
    }
  }

}
