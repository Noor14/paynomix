import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit, AfterViewInit {

  public businessDetailForm: FormGroup;
  @Input() businessDetail: any;
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
    this.businessDetailForm = this._formBuilder.group({
      Descriptor: [''],
      TaxIDNo: [''],
      BusinessType: ['', Validators.required],
      YearsInBusiness: [''],
      WebSite: ['', Validators.required],
      AcceptCreditCards: ['', Validators.required],
      BusinessPhone: [''],
      Fax: [''],
      BusinessAddress: [''],
      BusinessAddress1: [''],
      BusinessCity: [''],
      BusinessState: [''],
      BusinessZip: [''],
  });
  }
  ngAfterViewInit(): void {
    this.stepTwo.emit(this.businessDetailForm);
  }
}
