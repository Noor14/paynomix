import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { StripeElementsOptions } from '@stripe/stripe-js';

@Component({
  selector: 'app-creditcard-info',
  templateUrl: './creditcard-info.component.html',
  styleUrls: ['./creditcard-info.component.scss'],
  animations   : fuseAnimations

})
export class CreditcardInfoComponent implements OnInit {
  public elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };
  public cardOptions: any = {
    showIcon: true,
    style: {
     base: {
       'color': '#32325D',
       'fontWeight': '400',
       'fontFamily': 'Muli, Helvetica Neue, Arial, sans-serif',
       'fontSize': '15px',
       'fontSmoothing': 'antialiased',
 
       '::placeholder': {
         color: '#00000099',
       },
       ':-webkit-autofill': {
         color: '#e39f48',
       },
     },
     invalid: {
       'color': '#E25950',
 
       '::placeholder': {
         color: '#FFCCA5',
       },
     },
 
   }
 };
  public creditcardForm: FormGroup
  constructor(
    private readonly _formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.creditcardForm = this._formBuilder.group({
      CardholderName: ['', Validators.required],
      CardNumber: ['', Validators.required],
      CardExpiration: ['', Validators.required],
      SecurityCode:  ['', Validators.required],
      StreetAddress:  ['', Validators.required],
      ZipCode: ['', Validators.required]
    });
  }

}
