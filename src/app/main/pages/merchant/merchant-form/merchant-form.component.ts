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
      ...this.ownerDetailForm.value,
      MerchantBankAccount: this.bankAccountForm.value,
      MerchantAccountSetup: this.merchantInfoForm.value,
      MerchantBusiness: this.businessDetailForm.value,
    }
    this.submitForm.emit(obj);
  }

}
