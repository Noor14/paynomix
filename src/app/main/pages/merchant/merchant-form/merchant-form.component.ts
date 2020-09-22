import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-merchant-form',
  templateUrl: './merchant-form.component.html',
  styleUrls: ['./merchant-form.component.scss']
})
export class MerchantFormComponent implements OnInit {

  public merchantInfoForm: FormGroup;
  public businessDetailForm: FormGroup;
  public ownerDetailForm: FormGroup;
  public bankAccountForm: FormGroup;
  @Input() merchantDetail: any = null;
  @Output() submitForm = new EventEmitter<any>();


  constructor(private readonly _cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._cdref.detectChanges();
  }

  save(): void{
    const obj = {
      ...{...this.merchantDetail, ...this.ownerDetailForm.value},
      MerchantBankAccount: (this.merchantDetail && this.merchantDetail.MerchantBankAccount)? {...this.merchantDetail.MerchantBankAccount, ...this.bankAccountForm.value} : {...this.bankAccountForm.value},
      MerchantAccountSetup: (this.merchantDetail && this.merchantDetail.MerchantAccountSetup)? {...this.merchantDetail.MerchantAccountSetup, ...this.merchantInfoForm.value}: {...this.merchantInfoForm.value},
      MerchantBusiness: (this.merchantDetail && this.merchantDetail.MerchantBusiness)? {...this.merchantDetail.MerchantBusiness, ...this.businessDetailForm.value}: {...this.businessDetailForm.value},
    }
    this.submitForm.emit(obj);
  }

}
