import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import { SaleService } from '../../sale.service';
import { snackBarConfig , snackBarConfigWarn, validateAllFormFields} from 'constants/globalFunctions';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-creditcard-info',
  templateUrl: './creditcard-info.component.html',
  styleUrls: ['./creditcard-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations

})
export class CreditcardInfoComponent implements OnInit {
  @ViewChild(StripeCardNumberComponent, {static: false}) card: StripeCardNumberComponent;
  @Input() data: any;
  @Input() requiredFields: any;
  @Output() resetCreditCard = new EventEmitter<any>();
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
  public creditcardForm: FormGroup;

/**
     * Constructor
     *
     * @param {SaleService} _saleService
     * @param {StripeService} _stripeService
     * @param {MatSnackBar} _snackBar
     * @param {Router} _router
     */

  constructor(
    private readonly _saleService: SaleService,
    private readonly _formBuilder: FormBuilder,
    private readonly _stripeService: StripeService,
    private readonly _snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.creditcardForm = this._formBuilder.group({
      CardholderName: ['', Validators.required],
      Address:  ['', Validators.required],
      ZipCode: ['', Validators.required]
    });
  }
  payNow() {
    if(this.creditcardForm.valid) {
      this._stripeService.confirmCardPayment(this.data.SecretKey, {
        payment_method: {
          card: this.card.element
          }
        }).subscribe((result:any) => {
           if(result.error) {
            this._snackBar.open(result.error.message, '', snackBarConfigWarn);  
           } else {
            this.transactionProcess(result.paymentIntent);
           }
        }) 
    } else{
      validateAllFormFields(this.creditcardForm);
  }
  
  } 

private transactionProcess(paymentIntent){
  const object = [{
    Stripe : JSON.stringify(paymentIntent),
    ...this.data,
    ...this.creditcardForm.value
   }]
   this._saleService.payTransaction(object)
   .then((res :any) => {
     if(res && !res.StatusCode) {
      this._snackBar.open('Transaction has been Approved', '', snackBarConfig);
      this.resetCreditCard.emit(res.Response.shift());
     }
   }).catch((err: HttpErrorResponse)=>(console.log))
 } 
}
