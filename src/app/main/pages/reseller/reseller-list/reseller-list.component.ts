import { HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NoFoundComponent } from '@fuse/components/no-found/no-found.component';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResellerTableComponent } from '../reseller-table/reseller-table.component';
import { ResellerService } from '../reseller.service';

@Component({
  selector: 'app-reseller-list',
  templateUrl: './reseller-list.component.html',
  styleUrls: ['./reseller-list.component.scss']
})
export class ResellerListComponent implements OnInit, OnDestroy {
  @ViewChild('renderingContainer', { read: ViewContainerRef, static: false }) container: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  
  public resellers: any= [];
  private _unsubscribeAll: Subject<any>;


     /**
     * Constructor
     *
     * @param {ResellerService} _resellerService
     * @param {UserConfigService} _userConfigService
     * @param {ComponentFactoryResolver} _resolver
     */
    
    constructor(
      private readonly _resellerService: ResellerService,
      private readonly _userConfigService: UserConfigService,
      private readonly _resolver: ComponentFactoryResolver,
  ) { 
            // Set the private defaults
            this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._userConfigService.userModeChange
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(() => this.getResellers())
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
  getResellers(): void{
    this._resellerService.resellerList(this._userConfigService.getUserMode())
    .then((res: any) => {
        if(res && !res.StatusCode){
          if(res.Response && res.Response.length){
            this.resellers = res.Response;
            this.renderingComponent(ResellerTableComponent,{
              resellers: this.resellers,
            })
          }else{
            this.renderingComponent(NoFoundComponent)
          }
        }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

}
