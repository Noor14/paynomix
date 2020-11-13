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
    this._cdref.detectChanges();
    this.createPricingPlanForm();
  }
  
  ngOnChanges(){
    if(this.pricingPlanDetail){
      if(!this.pricngPlanForm){
        this.createPricingPlanForm();
      }
    }
  }
  ngAfterViewInit(): void {
    if(this.pricingPlanDetail) {
      this.pricngPlanForm.patchValue(this.pricingPlanDetail);
    }
  }
  createPricingPlanForm(): void{
    this.pricngPlanForm = this._formBuilder.group({
      PricingPlanID: [0, Validators.required],
      PricingTitle: ['', Validators.required],     
      Description: ['', Validators.required],
      Reserve: ['', [Validators.required, Validators.max(this.maxPercentage)]],
      DiscountRate: ['', [Validators.required, Validators.max(this.maxPercentage)]],
      AuthFee: ['', Validators.required],
      ChargeBack: ['', Validators.required],
      RetrievalFee: ['', Validators.required],
      MonthlyMinimunFee: ['', Validators.required],
      MonthlyStatementFee: ['', Validators.required],
      ApplicationSetupFee: ['', Validators.required],
      WireTransferFee: ['', Validators.required],
      GateWaySetupFee: ['', Validators.required],
      GateWayMonthlyAccess: ['', Validators.required],
      PerTransactionFee: ['', Validators.required],
      PricingPlanType: ['', Validators.required],
      FeeAmount: ['', Validators.required],
      OtherFee: ['', Validators.required],
      TransactionFee: ['', [Validators.required, Validators.max(this.maxPercentage)]],
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
