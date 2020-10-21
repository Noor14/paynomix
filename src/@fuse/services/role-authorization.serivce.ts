import { Injectable } from '@angular/core';
import { UserConfigService } from './user.config.service';

@Injectable({
  providedIn: 'root'
})
export class RoleAuthorizationService {
  
  private userRoles: any;
  constructor(private readonly _userConfigService: UserConfigService) {}
    
    isAuthorized() {
      this.userRoles = this._userConfigService.getUserMode();
      if(!this.userRoles){
        const info = localStorage.getItem('userInfo');
        if(info){
         this.userRoles = JSON.parse(info).UserAccount.UserRights;
        }
      }
        return this.userRoles && this.userRoles.length && !!this.userRoles;
    }

    hasRole(role) {
        return this.isAuthorized() && this.userRoles.some(obj => obj.RightId == role);
    }

 }

