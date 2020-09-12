import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validator } from 'constants/globalFunctions';

@Component({
  selector: 'app-merchant-info',
  templateUrl: './merchant-info.component.html',
  styleUrls: ['./merchant-info.component.scss']
})
export class MerchantInfoComponent implements OnInit, AfterViewInit, OnDestroy {

  public merchantInfoForm: FormGroup;
  @Input() merchantInfo: any = {};
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
    this.merchantInfoForm = this._formBuilder.group({
      MerchantUserName: ['', Validators.required],
      MerchantEmail: ['', [Validators.required, Validators.email, Validators.pattern(validator.emailPattern)]],
      PricingPlanID: ['1', Validators.required],
      PricingPlanName: ['', Validators.required],
      ResellerId: ['']
      });
  }
  ngAfterViewInit(): void {
    this.stepOne.emit(this.merchantInfoForm);
  }
  ngOnDestroy(): void{
    this.stepOne.emit(this.merchantInfoForm);
  }

}
