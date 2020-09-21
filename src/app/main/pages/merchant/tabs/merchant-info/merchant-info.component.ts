import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validator } from 'constants/globalFunctions';

@Component({
  selector: 'app-merchant-info',
  templateUrl: './merchant-info.component.html',
  styleUrls: ['./merchant-info.component.scss']
})
export class MerchantInfoComponent implements OnInit, AfterViewInit, OnChanges {

  public merchantInfoForm: FormGroup;
  @Input() merchantInfo: any = null;
  @Output() stepOne = new EventEmitter<any>();

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _formBuilder: FormBuilder
) { 
}

  ngOnInit(): void {
    this.createMerchantInfoForm();
  }

  ngOnChanges(): void{
    if(this.merchantInfo){
      this.createMerchantInfoForm();
      this.merchantInfoForm.patchValue(this.merchantInfo)
    }
  }
 
  ngAfterViewInit(): void {
    this.stepOne.emit(this.merchantInfoForm);
  }

  createMerchantInfoForm(): void{
    this.merchantInfoForm = this._formBuilder.group({
      AccountSetupId: [0, Validators.required],
      MerchantUserName: ['', Validators.required],
      MerchantEmail: ['', [Validators.required, Validators.email, Validators.pattern(validator.emailPattern)]],
      PricingPlanID: ['77', Validators.required],
      IpAddress: ['192.168.0.142', Validators.required]
      });
  }
}
