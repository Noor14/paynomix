import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Input, OnChanges, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NoFoundComponent } from '@fuse/components/no-found/no-found.component';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MerchantService } from '../../merchant/merchant.service';
import { PartnerService } from '../../partner/partner.service';
import { ResellerService } from '../../reseller/reseller.service';
import { PricingPlanTableComponent } from '../pricing-plan-table/pricing-plan-table.component';
import { PricingPlanService } from '../pricing-plan.service';

@Component({
  selector: 'app-pricing-plan-list',
  templateUrl: './pricing-plan-list.component.html',
  styleUrls: ['./pricing-plan-list.component.scss']
})
export class PricingPlanListComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('renderingContainer', { read: ViewContainerRef, static: false }) container: ViewContainerRef;
  private componentRef: ComponentRef<any>;

  public pricingPlans: any[] = [];
  @Input() getPricingPlanBy: any;
  @Input() headerVisibility: boolean = true;
  private _unsubscribeAll: Subject<any>;
  public assignPricingPlan: any = {}

    /**
    * Constructor
    *
    * @param {PricingPlanService} _pricingPlanService
    * @param {UserConfigService} _userConfigService
    * @param {ComponentFactoryResolver} _resolver
    * @param {MerchantService} _merchantService
    * @param {ResellerService} _resellerService
    * @param {PartnerService} _partnerService
    */
   
   constructor(
     private readonly _pricingPlanService: PricingPlanService,
     private readonly _userConfigService: UserConfigService,
     private readonly _merchantService: MerchantService,
     private readonly _resellerService: ResellerService,
     private readonly _partnerService: PartnerService,
    private readonly _resolver: ComponentFactoryResolver,
    private readonly _cdref: ChangeDetectorRef,
 ) { 
           // Set the private defaults
           this._unsubscribeAll = new Subject();
 }

  ngOnInit(): void {
    // this._cdref.detectChanges();
    // this._userConfigService.userModeChange
    // .pipe(takeUntil(this._unsubscribeAll))
    // .subscribe(() => {
    //   this.getPricingPlanBy = this._userConfigService.getUserMode();
    //   this.getPricingPlans(this.getPricingPlanBy);
    // });
  }

  ngOnChanges(): void{
    if (this.getPricingPlanBy && 
      Object.keys(this.getPricingPlanBy).length && 
      Object.values(this.getPricingPlanBy).toString()){
      this.getPricingPlans(this.getPricingPlanBy);
    }
    // else if(!this.getPricingPlanBy || !Object.keys(this.getPricingPlanBy).length){
    //   this._userConfigService.userModeChange
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe(() => {
    //     this.getPricingPlanBy = this._userConfigService.getUserMode();
    //     this.getPricingPlans(this.getPricingPlanBy);
    //   });
    // }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

 renderingComponent(type, data?) {
    const factory: ComponentFactory<any> = this._resolver.resolveComponentFactory(type);
      this.container.clear();
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.data = data;
  }
  getPricingPlans(obj: any): void{
    this._pricingPlanService.pricingPlanList(obj)
    .then((res: any) => {
        if(res && !res.StatusCode){
          if(res.Response && res.Response.length){
            this.pricingPlans = res.Response;
            this.assignPricingPlan = this.assignPlan(obj);
            this.renderingComponent(PricingPlanTableComponent, {
              pricingPlans: this.pricingPlans,
              assignPricingPlan: this.assignPricingPlan
            })
          }else{
            this.renderingComponent(NoFoundComponent)
          }

        }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

  getPartners(obj: any): Promise<any[]>{
   return this._partnerService.partnerList(obj)
    .then((res: any) => {
        if(res && !res.StatusCode){
            return res.Response.map((item: any) => {
              return {
                id: item.PartnerId, 
                name: item.PartnerName
              };
            });
        }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

  getResellers(obj: any): Promise<any[]>{
   return this._resellerService.resellerList(obj)
    .then((res: any) => {
        if(res && !res.StatusCode){
            return res.Response.map((item: any) => {
              return {
                id: item.ResellerId, 
                name: item.ResellerName
              };
            });
        }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

  getMerchants(obj: any): Promise<any[]>{
    return this._merchantService.merchantList(obj)
    .then((res: any) => {
        if(res && !res.StatusCode){
            return  res.Response.map((item: any) => {
              return {
                id: item.MerchantId, 
                name: item.MerchantAccountSetup.MerchantUserName
              };
            });
        }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }


  assignPlan(obj: any): any{
    const object:any = {};
    if(!obj || (obj
      && !Object.keys(obj).length)){
        object.AssignTo = 'Partner';
        this.getPartners(obj).then(res => object.AssigneeList = res);
      }
      else if(obj
        && obj.hasOwnProperty('PartnerId')){
          object.AssignTo = 'Reseller';
          this.getResellers(obj).then(res => object.AssigneeList = res)

      }else{
        object.AssignTo = 'Merchant';
        this.getMerchants(obj).then(res => object.AssigneeList = res)

      }
      return object;
  }

}
