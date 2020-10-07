
import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { locationConfig } from 'constants/globalFunctions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MakesaleService } from '../../sale/sale.service';

@Component({
  selector: 'app-make-sale',
  templateUrl: './make-sale.component.html',
  styleUrls: ['./make-sale.component.scss']
})
export class MakeSaleComponent implements OnInit {

  merchantLocationList: any;

  elements: any;
  cardNumbers:any;
  cardExpirys:any;
  cardCvcs:any;
  userQuestionUpdate = new Subject<string>();
  @ViewChild('mainPage', { static: false }) mainPage: ElementRef;
  public searchMerchantLocation: any;
  public openSheet: boolean = false;
  // public merchantLocationList: any[] = [];
  public selectedLocationId;
  form: FormGroup;
  stripeform: FormGroup;
  achForm: FormGroup;
  secretkey: any;
  stripe: any
  transactionAmount = false;
  stripeformValid = false;
  achButton = false;
  totalAmount: any
  locationSelected = true;
  MerchantId = '';
  processDisabled = false;

  States = locationConfig

  TransactionObject = [{
    TransactionId: 0,
    CustomerId: 2,
    CustomerName: "",
    InvoiceNo: "",
    Amount: '',
    StripeFee: 0,
    PaynomixFee: 0,
    PaymentType: "",
    PaymentData: "",
    TransactionType: 1,
    CustomerEmail: "",
    Status: 0,
    StatusMessage: "",
    DocId: "",
    AppId: "",
    ProfileId: 0,
    CardholderName: "",
    CardType: "",
    Last4digit: "",
    CurrencyCode: "",
    Currency: "usd",
    TransferGroup: "",
    PaynomixKey: "",
    OriginalChargeID: "",
    Description: "",
    ConnectedAccountID: "",
    Phone: "",
    Company: "",
    Country: "",
    ZipCode: "",
    City: "",
    State: "",
    Address: "",
    Stripe: "",
    LocationId: '',
    LocationName: '',
    MerchantId: '',
    // UserId: this.userId,
  }
  ]
 

  // public merchantLocationList: any[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _MakeAsaleService: MakesaleService,
  ) { }

  ngOnInit() {
    this.getLocations();
    this.form = this._formBuilder.group({
      Company: ['', [Validators.pattern('[a-zA-Z ]*$')]],
      CustomerName: [''],
      Email: ['', [Validators.email]],
      Phone: [''],
      Country: [''],
      ZipCode: ['', ''],
      City: [''],
      State: [this.States[0].name],
      Address: [''],
      Amount: [{ value: '', disabled: this.locationSelected }],
    });
  }

  getLocations() {
   
    this._MakeAsaleService.getMerchantLocation().then((res: any) => {
      if (res.StatusCode == 0) {
          
       
        // this.merchantLocationList = res.Response;
        this.merchantLocationList = res.Response.map((item: any) => {
        
          return {
            id: item.LocationId, 
            name: item.MerchantName
          };
        });
        setTimeout(() => {
          // const element = document.getElementsByClassName('bottomSheet')[0] as any;
          // element.click();
        }, 0)
      }
    })
  }





}
