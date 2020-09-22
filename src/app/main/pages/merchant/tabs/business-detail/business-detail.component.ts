import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { locationConfig, validator } from '../../../../../../constants/globalFunctions';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit, AfterViewInit, OnChanges {
  
  public locationObj = locationConfig;
  public validatorObj = validator; 

  public businessDetailForm: FormGroup;
  @Input() businessDetail: any = null;
  @Output() stepTwo = new EventEmitter<any>();

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _formBuilder: FormBuilder
) { }


  ngOnInit(): void {
    this.createBusinessDetailForm();
  }

  createBusinessDetailForm(): void{
    this.businessDetailForm = this._formBuilder.group({
      BusinessId: [0, Validators.required],
      BusinessType: ['', Validators.required],
      Descriptor:  [''],
      TaxIDNo:  [''],
      YearsInBusiness:  [''],
      WebSite: ['', Validators.required],
      AcceptCreditCards: ['', Validators.required],
      BusinessPhone:  [''],
      Fax:  [''],
      BusinessAddress:  [''],
      BusinessAddress1:  [''],
      BusinessCity:  [''],
      BusinessState:  [''],
      BusinessZip:  ['', Validators.maxLength(validator.zipMaxLength)]
  });
  }
  ngOnChanges(): void{
    if(this.businessDetail){
      this.createBusinessDetailForm();
      this.businessDetailForm.patchValue(this.businessDetail)
    }
  }
  ngAfterViewInit(): void {
    this.stepTwo.emit(this.businessDetailForm);
  }
}
