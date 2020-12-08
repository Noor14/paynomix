import { HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { OverlayLockService } from '@fuse/components/overlay-lock/overlay-lock.service';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs';
import { FraudMgmtService } from '../../fraud-mgmt.service';
import { TransactionControlsService } from '../transaction-controls.service';
import { IpBlockingTableComponent } from './ip-blocking-table/ip-blocking-table.component';

@Component({
  selector: 'app-ip-blocking',
  templateUrl: './ip-blocking.component.html',
  styleUrls: ['./ip-blocking.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IpBlockingComponent implements OnInit {
  public ipAddress: any[] = [];
  private _unsubscribeAll: Subject<any>;
  private componentRef: ComponentRef<any>;
  public data:any;
  public lockingDetails: any;
  public updateIpAddress:any;
  public disableForms:any
  @Input() fraudType : any;
  @ViewChild('renderingContainer', { read: ViewContainerRef }) container: ViewContainerRef;


  /**
   * Constructor
   *
   * @param {UserConfigService} _userConfigService
   * @param {ComponentFactoryResolver} _resolver
   * @param {TransactionControlsService} _transactionControlsService
   */

  constructor(
    private readonly _userConfigService: UserConfigService,
    private readonly _transactionControlsService: TransactionControlsService,
    private readonly _resolver: ComponentFactoryResolver,
    private readonly _fraudManagementService: FraudMgmtService,
    private readonly _overlayLockService: OverlayLockService,
  ) { }

  ngOnInit() {
    if(this.fraudType == 2) {
        this._userConfigService.userModeChange.subscribe(() => this.getIpAddress());
        this.getLockSettings(this.fraudType)
    }
  }
  getIpAddress(): any {
    const userRole  = this._userConfigService.getUserMode()
    const obj = {
      FraudType: 2,
      IsActive: true,
      ...userRole
    }
    this._transactionControlsService.getIpAddress(obj)
      .then((res: any) => {
        if (res && !res.StatusCode) {
          if (res.Response && res.Response.length) {
            this.ipAddress = res.Response;
            this.renderingComponent(IpBlockingTableComponent, {
              ipAddress: this.ipAddress,
            })
          } else {
            // this.renderingComponent(NoFoundComponent, {
            //   icon: 'no-pricing-plan',
            //   text: 'No partner found',
            //   subText: "You Haven't made any Partner yet"
            // });
          }
        }
      }).catch((err: HttpErrorResponse) => (console.log))
  }
  getLockSettings(obj?) : any {
    this._fraudManagementService.lockSettings({...this._userConfigService.getUserMode(), FraudTypeId: obj})
    .then((res:any)=> {
      if(res && !res.StatusCode) {
       this.lockingDetails = res.Response[0];
       this._overlayLockService.getOverLay('overlay').toggleOpen();
       this.disableForms = true;
      }
    })
  }
  renderingComponent(type, data?) {
    const factory: ComponentFactory<any> = this._resolver.resolveComponentFactory(type);
    this.container.clear();
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.data = data;
    this.componentRef.instance.update.subscribe(res => {
      if(res) {
       this.updateIpAddress = res;
      }
    })
  }
  updateList() {
   this.getIpAddress();
  }
}
