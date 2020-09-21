import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validateAllFormFields } from '../../../../../constants/globalFunctions';

@Component({
  selector: 'app-pricing-plan-form',
  templateUrl: './pricing-plan-form.component.html',
  styleUrls: ['./pricing-plan-form.component.scss']
})
export class PricingPlanFormComponent implements OnInit, OnChanges {

  public pricngPlanForm: FormGroup;
  @Output() submitForm = new EventEmitter<any>();
  @Input() pricingPlanDetail: any = null;
    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
      private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void{
    this.createPricingPlanForm()
  }
  
  ngOnChanges(){
    if(this.pricingPlanDetail){
      this.createPricingPlanForm()
      this.pricngPlanForm.patchValue(this.pricingPlanDetail)
    }
  }
  createPricingPlanForm(): void{
    this.pricngPlanForm = this._formBuilder.group({
      PricingPlanID: [0, Validators.required],
      PricingTitle: ['', Validators.required],     
      Description: ['', Validators.required],
      Reserve: ['', Validators.required],
      DiscountRate: ['', Validators.required],
      AuthFee: ['', Validators.required],
      ChargeBack: ['', Validators.required],
      RetrievalFee: ['', Validators.required],
      MonthlyMinimunFee: ['', Validators.required],
      MonthlyStatementFee: ['', Validators.required],
      ApplicationSetupFee: ['', Validators.required],
      WireTransferFee: ['', Validators.required],
      GateWaySetupFee: ['', Validators.required],
      GateWayMonthlyAccess: ['', Validators.required],
      GateWayTransactionFee: ['', Validators.required],
      FeeAmount: ['', Validators.required],
      OtherFee: ['', Validators.required],
      TransactionFee: ['', Validators.required],
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
