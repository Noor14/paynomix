import { HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NoFoundComponent } from '@fuse/components/no-found/no-found.component';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MerchantTableComponent } from '../merchant-table/merchant-table.component';
import { MerchantService } from '../merchant.service';
//import { MatMenuModule } from '@angular/material/menu';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent implements OnInit, OnDestroy {
  @ViewChild('renderingContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  public merchants:any[] = [];
  public merchantSearchForm: FormGroup;
  private _unsubscribeAll: Subject<any>;

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
  renderingComponent(type, data?) {
      const factory: ComponentFactory<any> = this._resolver.resolveComponentFactory(type);
      this.container.clear();
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.data = data;
  }

  getMerchants(){
    this._merchantService.merchantList(this._userConfigService.getUserMode())
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
            subText: "You Haven't made any Merchant yet"
          });
        }
      }
       
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

  // search(){
    
  //   var searchParam = {'MerchantUserName':'','ResellerName':'','Email':'','PricingTitle':''};
  //   if(this.merchantSearchForm.value.MerchantUserName!='')
  //   {
  //     searchParam.MerchantUserName =this.merchantSearchForm.value.MerchantUserName; 
  //   }
  //   else
  //   {
  //     delete searchParam.MerchantUserName;
  //   }
  //   if(this.merchantSearchForm.value.ResellerName!='')
  //   {
  //     searchParam.ResellerName =this.merchantSearchForm.value.ResellerName; 
  //   }
  //   else
  //   {
  //     delete searchParam.ResellerName;
  //   }
  //   if(this.merchantSearchForm.value.Email!='')
  //   {
  //     searchParam.Email =this.merchantSearchForm.value.Email; 
  //   }
  //   else
  //   {
  //     delete searchParam.Email;
  //   }
  //   if(this.merchantSearchForm.value.PricingTitle!='')
  //   {
  //     searchParam.PricingTitle =this.merchantSearchForm.value.PricingTitle; 
  //   }
  //   else
  //   {
  //     delete searchParam.PricingTitle;
  //   }
 
  //   this._merchantService.merchantList(searchParam)
  //   .then((res: any) => {
  //     if(res && !res.StatusCode){
  //       if(res.Response && res.Response.length){
  //         this.merchants = res.Response;
  //         this.renderingComponent(MerchantTableComponent,{
  //           merchants: this.merchants,
  //         })
  //       }else{
  //         this.renderingComponent(NoFoundComponent, {
  //           icon: 'no-pricing-plan',
  //           text: 'No merchant found',
  //           subText: "You haven't made any Merchant"
  //         });
  //       }
        
  //     }
       
  //   }).catch((err: HttpErrorResponse)=>(console.log))
  // }
  

  // stopPropagation(event){
    
  //   event.stopPropagation();
  // }


}
