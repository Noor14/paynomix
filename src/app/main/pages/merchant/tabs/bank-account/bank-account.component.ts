import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validator } from '../../../../../../constants/globalFunctions';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss']
})
export class BankAccountComponent implements OnInit, AfterViewInit {

  public bankAccountForm: FormGroup;
  public validatorConfig = validator;
  @Input() bankAccountDetail: any = null;
  @Output() stepFour = new EventEmitter<any>();

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _formBuilder: FormBuilder
) { }

  ngOnInit(): void {
    this.createBankAccountForm()
  }

  ngOnChanges(): void{
    if(this.bankAccountDetail){
      this.createBankAccountForm();
      this.bankAccountForm.patchValue(this.bankAccountDetail)
    }
  }
  ngAfterViewInit(): void {
    this.stepFour.emit(this.bankAccountForm);
  }
  createBankAccountForm(): void{
    this.bankAccountForm = this._formBuilder.group({
      BankAccountId: [0, Validators.required],
      BankAccountType: ['', Validators.required],
      RoutingNumber: ['', [Validators.required, Validators.maxLength(validator.maxRoutingNo), Validators.minLength(validator.maxRoutingNo)]],
      AccountNumber: ['',[Validators.required, Validators.maxLength(validator.accMaxLength)]],
      Currency: ['usd', Validators.required]
  });
  }
}
