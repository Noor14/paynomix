import { Component, OnInit } from '@angular/core';
import { UserConfigService } from '@fuse/services/user.config.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private readonly _userConfigService: UserConfigService) { }

  ngOnInit() {
    const {EntityId, UserRoleId} = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'))
    if(EntityId){
      const userRole =  (UserRoleId == 2)? 'MerchantId': 
       (UserRoleId == 3)? 'PartnerId' : 
       (UserRoleId == 4)? 'ResellerId' : 
       (UserRoleId == 5)? 'CustomerId' : 'DemoCustomerId'
       this._userConfigService.setUserMode({
        [userRole] : EntityId
      })
     }
  }

}
