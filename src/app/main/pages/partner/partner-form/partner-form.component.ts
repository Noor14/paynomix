import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as globalConfig from '../../../../../constants/globalFunctions';

@Component({
  selector: 'app-partner-form',
  templateUrl: './partner-form.component.html',
  styleUrls: ['./partner-form.component.scss']
})
export class PartnerFormComponent implements OnInit, OnChanges {
  public partnerForm: FormGroup;
  @Output() submitForm = new EventEmitter<any>();
  @Input() partnerDetail: any = null;
  public globalConfig = globalConfig;

      /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
      private readonly _formBuilder: FormBuilder
  ) {}


ngOnInit(): void{
  this.createPartnerForm();
}

ngOnChanges(){
  if(this.partnerDetail){
    if(!this.partnerForm){
      this.createPartnerForm()
    }
    this.partnerForm.patchValue(this.partnerDetail)
  }
}


createPartnerForm(): void{
  this.partnerForm = this._formBuilder.group({
    PartnerId: [0, Validators.required],
    PartnerName: [{value: '', disabled: this.partnerDetail},[ Validators.required ,Validators.maxLength(globalConfig.validator.maxFieldLength)]], 
    DBAName: ['' , Validators.maxLength(globalConfig.validator.maxFieldLength)],
    FirstName: ['', [Validators.required,Validators.maxLength(globalConfig.validator.maxName)]],
    LastName: ['', [Validators.required , Validators.maxLength(globalConfig.validator.maxName)]],
    Country:  [''],
    Address1: ['', Validators.required],
    City: ['', Validators.required],
    State: [''],
    Zip: ['', [Validators.required, Validators.maxLength(globalConfig.validator.zipMaxLength)]],
    Email:  [{value: '', disabled: this.partnerDetail}, [Validators.required, Validators.email, Validators.pattern(globalConfig.validator.emailPattern)]],
    WebsiteUrl: ['', Validators.required],
    Phone: ['', Validators.required],
    AlternatePhone: [''],
    TaxId: [''],
    ExchangeRateMarkup: ['', [Validators.required ,Validators.max(globalConfig.validator.maxPercentage)]],
    DefaultSettlementCurrency: ['', Validators.required]
});

}

submit(){
   if(this.partnerForm.valid){
     this.submitForm.emit({...this.partnerDetail, ...this.partnerForm.value});
   }else{
    globalConfig.validateAllFormFields(this.partnerForm)
   }
 }

}
