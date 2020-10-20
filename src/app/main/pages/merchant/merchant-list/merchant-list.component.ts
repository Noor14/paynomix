import { HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NoFoundComponent } from '@fuse/components/no-found/no-found.component';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MerchantTableComponent } from '../merchant-table/merchant-table.component';
import { MerchantService } from '../merchant.service';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent implements OnInit, OnDestroy {
  @ViewChild('renderingContainer', { read: ViewContainerRef, static: false }) container: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  public merchants:any[] = [];
  private _unsubscribeAll: Subject<any>;

    /**
    * Constructor
    *
    * @param {MerchantService} _merchantService
    * @param {UserConfigService} _userConfigService
    *  @param {ComponentFactoryResolver} _resolver
    */
   
   constructor(
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

  getMerchants(): void{
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
            text: 'No merchant found'
          });
        }
      }
       
    }).catch((err: HttpErrorResponse)=>(console.log))
  }


}
