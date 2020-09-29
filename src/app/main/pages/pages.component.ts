import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserConfigService } from '@fuse/services/user.config.service';
import { authRole } from '../../../constants/globalFunctions';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, OnDestroy {

  constructor(private readonly _userConfigService: UserConfigService) { }

  ngOnInit() {
    const {EntityId, UserRoleId} = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'))
    if(EntityId){
      const userRole =  (UserRoleId === authRole.merchant) ? 'MerchantId' : 
       (UserRoleId === authRole.partner) ? 'PartnerId' : 
       (UserRoleId === authRole.reseller) ? 'ResellerId' : 
       (UserRoleId === authRole.customer) ? 'CustomerId' : 'DemoCustomerId';
       this._userConfigService.setUserMode({
        [userRole] : EntityId
      })
     }
  }

  ngOnDestroy(): void {
    if(this._userConfigService.getUserMode())
    this._userConfigService.setUserMode(null)
  }

}
