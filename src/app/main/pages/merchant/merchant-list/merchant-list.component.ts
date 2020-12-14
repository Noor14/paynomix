import { HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { NoFoundComponent } from '@fuse/components/no-found/no-found.component';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MerchantTableComponent } from '../merchant-table/merchant-table.component';
import { MerchantService } from '../merchant.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as globalConfig from '../../../../../constants/globalFunctions';
import { AdvancedSearchComponent } from '@fuse/components/advanced-search/advanced-search.component';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MerchantListComponent implements OnInit, OnDestroy {
  @ViewChild('renderingContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  public merchants:any[] = [];
  public merchantSearchForm: FormGroup;
  private _unsubscribeAll: Subject<any>;
  public globalConfig = globalConfig;
  public MerchantSearchField = [];
  @ViewChild(AdvancedSearchComponent) childComponentMenu: AdvancedSearchComponent;
    /**
    * Constructor
    *
    * @param {MerchantService} _merchantService
    * @param {UserConfigService} _userConfigService
    * @param {ComponentFactoryResolver} _resolver
    */
   
   constructor(
     private readonly _formBuilder: FormBuilder,
     private readonly _merchantService: MerchantService,
     private readonly _userConfigService: UserConfigService,
     private readonly _resolver: ComponentFactoryResolver
 ) { 
           // Set the private defaults
           this._unsubscribeAll = new Subject();
           this.MerchantSearchField = [
            { label: "Company Name ", ControlName: "MerchantUserName" },
            { label: "Reseller Name ", ControlName: "ResellerName" },
            { label: "Email ", ControlName: "Email" },
            { label: "Pricing Title ", ControlName: "PricingTitle" }
          ];
 }

  ngOnInit(): void {
    
    this._userConfigService.userModeChange
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(() => this.getMerchants());
    this.merchantSearchForm = this._formBuilder.group({
      MerchantUserName: [''],
      ResellerName: [''],
      Email: [''],
      PricingTitle: [''],
     });
    
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this.componentRef && this.componentRef.destroy();
  }
  renderingComponent(type, data?, containerValue?) {
    if(containerValue){
      const factory: ComponentFactory<any> = this._resolver.resolveComponentFactory(type);
      // this.container.clear();
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.data = data.data;
    }
     else{
      const factory: ComponentFactory<any> = this._resolver.resolveComponentFactory(type);
      this.container.clear();
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.data = data;
      // this.getPartners();
     }

  }

  getMerchants(){
    const obj = {
      ...this._userConfigService.getUserMode(),
      RecordLimit: 100,
      PageNo: 1,
  }
    this._merchantService.merchantList(obj)
    .then((res: any) => {
      if(res && !res.StatusCode){
        if(res.Response && res.Response.length){
          this.merchants = res.Response;
          this.renderingComponent(MerchantTableComponent,{
            merchants: this.merchants,
          })
        }else{
          this.renderingComponent(NoFoundComponent, {
            icon: 'no-pricing-plan',
            text: 'No Merchant(s) Found',
            subText: "You haven't boarded any merchant yet"
          });
        }
      }
       
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

  searchmerchant(value){
   
    this._merchantService.merchantList(value)
    .then((res: any) => {
      if(res && !res.StatusCode){
        if(res.Response && res.Response.length){
          this.merchants = res.Response;
          this.renderingComponent(MerchantTableComponent,{
            merchants: this.merchants,
          })
        }else{
          this.renderingComponent(NoFoundComponent, {
            icon: 'no-pricing-plan',
            text: 'No merchant found',
            subText: "You haven't made any Merchant yet"
          });
        }
      }
    }).catch((err: HttpErrorResponse)=>(console.log))

  }

  openmenu(){
    this.renderingComponent(AdvancedSearchComponent,{
     data : this.merchantSearchForm
    },
    'searchContainer'
    )
  }


}
