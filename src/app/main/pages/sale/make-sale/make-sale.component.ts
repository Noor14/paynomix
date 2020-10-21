import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AchInfoComponent } from '../sale-info/ach-info/ach-info.component';
import { CreditcardInfoComponent } from '../sale-info/creditcard-info/creditcard-info.component';
import { SaleService } from '../sale.service';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-make-sale',
  templateUrl: './make-sale.component.html',
  styleUrls: ['./make-sale.component.scss']
})
export class MakeSaleComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('renderingContainer', { read: ViewContainerRef, static: false }) container: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  public bottomSheetEnable: boolean =  true;
  public bottomSheetDrawerOpen: boolean = false;
  public merchantLocation: any[] = [];
  private _unsubscribeAll: Subject<any>;

  constructor(
    private readonly _resolver: ComponentFactoryResolver,
    private readonly _userConfigService: UserConfigService,
    private readonly _saleService: SaleService,
    private readonly _cdref: ChangeDetectorRef,
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
    this.renderingComponent(CreditcardInfoComponent);
  }
  
  ngOnDestroy(): void{
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
  }
  renderingComponent(type, data?): void {
    const factory: ComponentFactory<any> = this._resolver.resolveComponentFactory(type);
    this.container.clear();
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.data = data;
  }

  cardType(type: number): void{
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
          this._cdref.detectChanges();

      }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

  onSelected(event: number): void{
    console.log(event);
  }

  createMakeSaleForm(): void {
 
  }
}
