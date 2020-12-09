import { Component, OnDestroy, OnInit } from '@angular/core';
import { HierarchicalTreeService } from '@fuse/components/hierarchical-tree/hierarchical-tree.service';
import { UserConfigService } from '@fuse/services/user.config.service';
import { authRole } from '../../../constants/globalFunctions';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, OnDestroy {

  constructor(
    private readonly _hierarchyService: HierarchicalTreeService,
    private readonly _userConfigService: UserConfigService) { }

  ngOnInit() {
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
    this._userConfigService.loggedInUser = { Username, ...obj }

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
