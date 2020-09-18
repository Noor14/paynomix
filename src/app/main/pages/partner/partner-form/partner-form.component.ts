import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { states, validateAllFormFields, validator } from '../../../../../constants/globalFunctions';

@Component({
  selector: 'app-partner-form',
  templateUrl: './partner-form.component.html',
  styleUrls: ['./partner-form.component.scss']
})
export class PartnerFormComponent implements OnInit, OnChanges {
  public partnerForm: FormGroup;
  @Output() submitForm = new EventEmitter<any>();
  @Input() partnerDetail: any = null;
  public statesList = states;

      /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
      private readonly _formBuilder: FormBuilder

  ) {}


ngOnInit(): void{
  this.createPartnerForm()
}

ngOnChanges(){
  if(this.partnerDetail){
    this.createPartnerForm()
    this.partnerForm.patchValue(this.partnerDetail)
  }
}


createPartnerForm(): void{
  this.partnerForm = this._formBuilder.group({
    PartnerId: [0, Validators.required],
    PartnerName: ['', Validators.required], 
    DBAName: [''],
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Country:  [''],
    Address1: ['', Validators.required],
    City: ['', Validators.required],
    State: [''],
    Zip: ['', Validators.required],
    Email:  ['', [Validators.required, Validators.email, Validators.pattern(validator.emailPattern)]],
    WebsiteUrl: ['', Validators.required],
    Phone: ['', Validators.required],
    AlternatePhone: [''],
    TaxId: [''],
    ExchangeRateMarkup: [''],
    DefaultSettlementCurrency: ['', Validators.required]
});

}

submit(){
   if(this.partnerForm.valid){
     this.submitForm.emit(this.partnerForm.value);
   }else{
    validateAllFormFields(this.partnerForm)
   }
 }

}
