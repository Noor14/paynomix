import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reseller-form',
  templateUrl: './reseller-form.component.html',
  styleUrls: ['./reseller-form.component.scss']
})
export class ResellerFormComponent implements OnInit {

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
      partnersName: ['', Validators.required],
      resellerName: ['', Validators.required],
      country: ['', Validators.required],
      DBAName: ['', ''],
      Address: ['', Validators.required],
      City: ['', Validators.required],
      states: ['', Validators.required],
      Zip: ['', Validators.required],
      Email: ['', Validators.required],
      AlternateEmail: ['', ''],
      OfficePhone: ['', Validators.required],
      ext1: ['', ''],
      AlternatePhone: ['', ''],
      ext2: ['', ''],
      fax: ['', ''],
      TaxId: ['', Validators.required]
 });
 }
}
