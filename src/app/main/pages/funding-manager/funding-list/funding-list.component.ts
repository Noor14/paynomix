import { HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NoFoundComponent } from '@fuse/components/no-found/no-found.component';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FundManagerService } from '../funding-manager.service';
import { FundedTableComponent } from '../tabs/funded-table/funded-table.component';
import { NonFundedTableComponent } from '../tabs/non-funded-table/non-funded-table.component';

@Component({
  selector: 'app-funding-list',
  templateUrl: './funding-list.component.html',
  styleUrls: ['./funding-list.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class FundingListComponent implements OnInit, OnDestroy {
  @ViewChild('renderingContainerFunded', { read: ViewContainerRef, static: false }) fundedContainer: ViewContainerRef;
  private fundedComponentRef: ComponentRef<any>;

  @ViewChild('renderingContainerNonFunded', { read: ViewContainerRef, static: false }) nonFundedContainer: ViewContainerRef;
  private nonFundedComponentRef: ComponentRef<any>;

  public fundsList: any = [];
  private _unsubscribeAll: Subject<any>;
  
      /**
      * Constructor
      *
      * @param {PartnerService} _fundManagerService
      * @param {UserConfigService} _userConfigService
      * @param {ComponentFactoryResolver} _resolver
      */
     
     constructor(
       private readonly _fundManagerService: FundManagerService,
       private readonly _userConfigService: UserConfigService,
      private readonly _resolver: ComponentFactoryResolver

   ) { 
             // Set the private defaults
             this._unsubscribeAll = new Subject();
   }

   ngOnInit(): void {
    this._userConfigService.userModeChange
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(() => this.getFundingList())
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  renderingComponent(type, data?) {
    if(data.type == 'nonFunded'){
      const factory: ComponentFactory<any> = this._resolver.resolveComponentFactory(type);
      this.nonFundedContainer.clear();
      this.nonFundedComponentRef = this.nonFundedContainer.createComponent(factory);
      this.nonFundedComponentRef.instance.data = data;
    }else{
      const factory: ComponentFactory<any> = this._resolver.resolveComponentFactory(type);
      this.fundedContainer.clear();
      this.fundedComponentRef = this.fundedContainer.createComponent(factory);
      this.fundedComponentRef.instance.data = data;
    }
  }
  getFundingList(): void{
    this._fundManagerService.fundingList(this._userConfigService.getUserMode())
    .then((res: any) => {
        if(res && !res.StatusCode){
          if(res.Response && res.Response.length){
            this.fundsList = res.Response;
            //to do
            this.renderingComponent(NonFundedTableComponent, {
              nonFundedList: this.fundsList,
              type: 'nonFunded'
            })
            this.renderingComponent(FundedTableComponent, {
              fundedList: this.fundsList,
            })
          }else{
            this.renderingComponent(NoFoundComponent)
          }
        }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

}
