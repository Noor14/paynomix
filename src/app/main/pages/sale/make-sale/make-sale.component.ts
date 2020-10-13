import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as globalConfig from '../../../../../constants/globalFunctions';
@Component({
  selector: 'app-make-sale',
  templateUrl: './make-sale.component.html',
  styleUrls: ['./make-sale.component.scss']
})
export class MakeSaleComponent implements OnInit {
  achButton = false;
  public makeSaleForm: FormGroup;
  public globalConfig = globalConfig;
  public makeSaleFormAch: FormGroup;
  public makeSaleFormCc: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  public settingBottomSheetInfo: object = Object.freeze({
    purpose: 'Please Select a Location',
    icon: 'location_on',
    label: 'Search Location'
  });

  ngOnInit() {
   this.createMakeSaleForm();
  }
  bankCard() {
   
      this.achButton = false;
    } 
  achCard() {

    this.achButton = true;
  }
  createMakeSaleForm(): void {
    this.makeSaleForm = this._formBuilder.group({
      Amount: ['', Validators.required],
      Company: ['', Validators.required],
      CustomerName: ['', Validators.required],
      Email: ['', Validators.required],
      Phone: ['', Validators.required],
      Address: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      Country: ['', Validators.required]
    });
    this.makeSaleFormCc = this._formBuilder.group({
      CardholderName: ['', Validators.required],
      CardNumber: ['', Validators.required],
      CardExpiration: ['', Validators.required],
      SecurityCode:  ['', Validators.required],
      StreetAddress:  ['', Validators.required],
      ZipCode: ['', Validators.required]
    });
    this.makeSaleFormAch = this._formBuilder.group({
      RoutingNumber:['', Validators.required],
      AccountNumber: ['', Validators.required]
     
    });
  }
}
