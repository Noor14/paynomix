import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HierarchicalTreeService } from '@fuse/components/hierarchical-tree/hierarchical-tree.service';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { authRole } from '../../../constants/globalFunctions';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  animations   : fuseAnimations

})
export class PagesComponent implements OnInit, OnDestroy {

  public idleCounter:number;
  public idleState: boolean;
  constructor(
    private _idle: Idle, 
    private readonly _router: Router,
    private readonly _hierarchyService: HierarchicalTreeService,
    private readonly _userConfigService: UserConfigService) { }

  ngOnInit() {
 
    // sets an idle timeout of 90 seconds, for testing purposes.
    this._idle.setIdle(90);
    // sets a timeout period of 15 seconds. after 90 seconds of inactivity, the user will be considered timed out.
    this._idle.setTimeout(15);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this._idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.startIdleOrResume();
    this.getHierarchy();
    const {EntityId, UserRoleId, Username} = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'))
    const userRole =  (UserRoleId === authRole.merchant) ? 'MerchantId' : 
     (UserRoleId === authRole.partner) ? 'PartnerId' : 
     (UserRoleId === authRole.reseller) ? 'ResellerId' : 
     (UserRoleId === authRole.customer) ? 'CustomerId' : 'DemoCustomerId';
     const obj = {
      [userRole] : EntityId,
      EntityId: EntityId,
      UserRoleId : UserRoleId
     }
    this._userConfigService.setUserMode(obj)
    this._userConfigService.loggedInUser = { Username, ...obj };

   
    this._idle.onIdleEnd.subscribe();
    this._idle.onTimeout.subscribe(() => this.logout());
    this._idle.onIdleStart.subscribe(() => this.idleState = true);
    this._idle.onTimeoutWarning.subscribe((countdown) => this.idleCounter = countdown);
    
     

  }
  startIdleOrResume(){
    this.idleState = false;
    this._idle.watch();
  }

  logout(): void{
    localStorage.clear();
    this._router.navigate(['/login']);
  }



  getHierarchy() {
    this._hierarchyService.getHierarchyTree()
    .then((res:any) => {
      if(res && !res.StatusCode) {
       this._userConfigService.setHierarchy(res.Response);
      }
    })
  }
  ngOnDestroy(): void {
    if(this._userConfigService.getUserMode())
    this._userConfigService.setUserMode(null)
    this._userConfigService.loggedInUser = {};
    localStorage.clear();
  }

}
