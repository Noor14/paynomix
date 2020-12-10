import { HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NoFoundComponent } from '@fuse/components/no-found/no-found.component';
import { SlidingPanelService } from '@fuse/components/sliding-panel/sliding-panel.service';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResellerTableComponent } from '../reseller-table/reseller-table.component';
import { ResellerService } from '../reseller.service';
import * as globalConfig from '../../../../../constants/globalFunctions';
import { AdvancedSearchComponent } from '@fuse/components/advanced-search/advanced-search.component';

@Component({
  selector: 'app-reseller-list',
  templateUrl: './reseller-list.component.html',
  styleUrls: ['./reseller-list.component.scss']
})
export class ResellerListComponent implements OnInit, OnDestroy {
  @ViewChild('renderingContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  
  public resellers: any= [];
  private _unsubscribeAll: Subject<any>;
  public ResellerSearchForm: FormGroup;
  public globalConfig = globalConfig;
  public ResellerSearchField = [];
  @ViewChild(AdvancedSearchComponent) childComponentMenu: AdvancedSearchComponent;
     /**
     * Constructor
     *
     * @param {ResellerService} _resellerService
     * @param {UserConfigService} _userConfigService
     * @param {SlidingPanelService} _slidingPanelService
     * @param {ComponentFactoryResolver} _resolver
     */
    
    constructor(
      private readonly _formBuilder: FormBuilder,
      private readonly _resellerService: ResellerService,
      private readonly _userConfigService: UserConfigService,
      private readonly _resolver: ComponentFactoryResolver,
      private readonly _slidingPanelService: SlidingPanelService,
  ) { 
            // Set the private defaults
            this._unsubscribeAll = new Subject();
            this.ResellerSearchField = [
              { label: "Reseller Name ", ControlName: "ResellerName" },
              { label: "Partner Name ", ControlName: "PartnerName" },
              { label: "Email ", ControlName: "Email" },
             
            ];
  }

  ngOnInit(): void {
    this._userConfigService.userModeChange
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(() => this.getResellers());
 
    const panelChangesSubscriber = this._slidingPanelService.panelChange.subscribe((res: any) => {
      if (res) {
        this.getResellers()
        // this._slidingPanelService.setSlidingPanelStatus(false);
        // panelChangesSubscriber && panelChangesSubscriber.unsubscribe();
      }
    })
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
  getResellers(): void{
    const obj = {
      ...this._userConfigService.getUserMode(),
      RecordLimit: 100,
      PageNo: 1,
    }
    this._resellerService.resellerList(obj)
    .then((res: any) => {
        if(res && !res.StatusCode){
          if(res.Response && res.Response.length){
           
            this.resellers = res.Response;
            this.renderingComponent(ResellerTableComponent,{
              resellers: this.resellers,
            })
          }else{
            this.renderingComponent(NoFoundComponent, {
              icon: 'no-pricing-plan',
              text: 'No reseller found',
              subText: "You haven't made any Reseller yet"
            });
          }
        }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }
  openSlidePanel(): void{
  
    this._slidingPanelService.getSidebar('slidePanel', 'ResellerCreateComponent').toggleOpen();
}
searchreseller(value){
  this._resellerService.resellerList(value)
  .then((res: any) => {
    if(res && !res.StatusCode){
      if(res.Response && res.Response.length){
        this.resellers = res.Response;
        this.renderingComponent(ResellerTableComponent,{
          resellers: this.resellers,
        })
      }else{
        this.renderingComponent(NoFoundComponent, {
          icon: 'no-pricing-plan',
          text: 'No Reseller found',
          subText: "You haven't made any Reseller yet"
        });
      }
    }
  }).catch((err: HttpErrorResponse)=>(console.log))

}

openmenu(){

  this.renderingComponent(AdvancedSearchComponent,{
   data : this.ResellerSearchField
  },
  'searchContainer'
  )
}
  
}
