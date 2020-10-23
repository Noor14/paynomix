import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserConfigService } from '@fuse/services/user.config.service';
import { snackBarConfigWarn } from '../../../../../constants/globalFunctions';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil, tap } from 'rxjs/operators';
import { AchInfoComponent } from '../sale-info/ach-info/ach-info.component';
import { CreditcardInfoComponent } from '../sale-info/creditcard-info/creditcard-info.component';
import { SaleService } from '../sale.service';
import { StripeService, StripeCardNumberComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  PaymentIntent,
} from '@stripe/stripe-js';
@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-make-sale',
  templateUrl: './make-sale.component.html',
  styleUrls: ['./make-sale.component.scss'],
})
export class MakeSaleComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('renderingContainer', { read: ViewContainerRef, static: false }) container: ViewContainerRef;
  @ViewChild('amount', {static: false}) amountInput: ElementRef;
  private componentRef: ComponentRef<any>;
  public bottomSheetEnable: boolean =  true;
  public bottomSheetDrawerOpen: boolean = false;
  public merchantLocation: any[] = [];
  private _unsubscribeAll: Subject<any>;
  private selectedLocationId: number;
  public stripeInstanceInitialize:any;
  private selectedCardType: number = 0;
  // stripe declaration
  // @ViewChild(StripeCardNumberComponent, {static: false}) card: StripeCardNumberComponent;

  constructor(
    private readonly _resolver: ComponentFactoryResolver,
    private readonly _userConfigService: UserConfigService,
    private readonly _saleService: SaleService,
    private readonly _snackBar: MatSnackBar,
    private readonly _stripeService: StripeService

  ) { 
    this._unsubscribeAll = new Subject();

  }

  public makeSaleBottomSheetInfo: object = Object.freeze({
    purpose: 'Please Select a Location',
    icon: 'location_on',
    label: 'Search Location'
  });

  ngOnInit(): void{
    this._userConfigService.userModeChange
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(() => this.getMerchantLocation());
  }

  ngAfterViewInit(): void{
    // this.renderingComponent(CreditcardInfoComponent);
    fromEvent(this.amountInput.nativeElement, 'keyup')
    .pipe(
        takeUntil(this._unsubscribeAll),
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
    )
    .subscribe(res => {
      if(this.amountInput.nativeElement.value){
        this.transactionInitialize(Number(this.amountInput.nativeElement.value));
      }else{
       this.stripeInstanceInitialize = undefined;
       this.container.clear();
      }
    });
  }
  
  ngOnDestroy(): void{
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        this.componentRef && this.componentRef.destroy();
        this.componentRef && this.componentRef.changeDetectorRef.detach();
  }
  renderingComponent(type, data?): void {
    const factory: ComponentFactory<any> = this._resolver.resolveComponentFactory(type);
    if(this.componentRef){
      this.componentRef.changeDetectorRef.detach();
    }
    this.container.clear();
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.data = data;
    this.componentRef.changeDetectorRef.detectChanges();
  }

  cardType(type: number): void{
    this.selectedCardType = type;
    (type) ? this.renderingComponent(AchInfoComponent) : 
    this.renderingComponent(CreditcardInfoComponent);
  }
  
  getMerchantLocation(): void{
    this._saleService.locationList(this._userConfigService.getUserMode())
    .then((res: any) => {
          if(res && !res.StatusCode && res.Response && res.Response.length){
          this.merchantLocation = res.Response.map((item: any) => {
            return {
              id: item.LocationId, 
              name: item.DisplayName
            };
          });
          this.bottomSheetDrawerOpen = true;

      }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }


 transactionInitialize(Amount: number): void{
    const obj = {
      Amount,
      LocationId: this.selectedLocationId
    };
    // this.stripeInstanceInitialize = undefined;
    this.container.clear();
    this._saleService.transactionInit(obj)
    .then((res: any) => {
          if(res && !res.StatusCode){
            if(res.Response.PublishKey){
              // this.stripeInstanceInitialize = this._stripeService.setKey(res.Response.PublishKey);
              this._stripeService.setKey(res.Response.PublishKey);
              this.cardType(this.selectedCardType);
            }else{
              this._snackBar.open('Please select another location', '', snackBarConfigWarn);
            }
         }else{
          this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn);
         }
    }).catch((err: HttpErrorResponse)=>(this._snackBar.open(err.error.Message, '', snackBarConfigWarn)))
  }

  onSelected(event: number): void{
    this.selectedLocationId = event;
  }

}
