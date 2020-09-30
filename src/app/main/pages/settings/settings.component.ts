import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as globalConfig from '../../../../constants/globalFunctions';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public settingForm: FormGroup;
  public globalConfig = globalConfig;
    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
      private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
 this.settingForm = this._formBuilder.group({
  MerchantId:['', Validators.required],
  MerchantUserName: ['', Validators.required],
  FirstName: ['', Validators.required],
  LastName: ['', Validators.required],
  Address1: ['', Validators.required],
  Address2: [''],
  City: ['', Validators.required],
  State: ['', Validators.required],
  Zip: ['', [Validators.required, Validators.maxLength(globalConfig.validator.zipMaxLength)]],
  Country: ['', Validators.required]
});
 }
}
