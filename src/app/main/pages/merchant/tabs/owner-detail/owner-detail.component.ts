import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.scss']
})
export class OwnerDetailComponent implements OnInit {
 
  @Input() ownerDetail: any;

  public ownerDetailForm: FormGroup;
  @Input() businessDetail: any;
  @Output() stepThree = new EventEmitter<any>();

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _formBuilder: FormBuilder
) { }

  ngOnInit(): void {
    this.ownerDetailForm = this._formBuilder.group({
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
    this.stepThree.emit(this.ownerDetailForm);
  }

}
