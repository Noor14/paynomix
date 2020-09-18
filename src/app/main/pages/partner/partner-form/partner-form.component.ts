import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-partner-form',
  templateUrl: './partner-form.component.html',
  styleUrls: ['./partner-form.component.scss']
})
export class PartnerFormComponent implements OnInit {
  public form: FormGroup;

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _formBuilder: FormBuilder
) { }

ngOnInit(): void {
   this.form = this._formBuilder.group({
    PartnerName: ['', Validators.required], 
    DBAName: ['', ''],
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Address: ['', Validators.required],
    City: ['', Validators.required],
    Email: ['', Validators.required],
    Phone: ['', Validators.required],
    AlternatePhone: ['', ''],
    State: ['', Validators.required],
    Country:  ['' , Validators.required],
    WebsiteUrl: ['', Validators.required],
    Zip: ['', Validators.required],
    TaxId: ['', ''],
    ExchangeRate: [0.00 , ''],
    DefaultSettlementCurrency: ['', Validators.required]
});
}

}
