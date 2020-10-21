
export class RoleAuthorizationService {
  
  private userRole: number;
  constructor() {}
    
    isAuthorized(): boolean {
      // this.userRole = this._userConfigService.getUserMode();
      // if(!this.userRole){
        const info = localStorage.getItem('userInfo');
        if(info){
         this.userRole = JSON.parse(info).UserRoleId;
        }
        return this.userRole && !!this.userRole;
      }
    // }

    hasRole(role): boolean {
        return this.isAuthorized() && this.userRole === role
    }

 }

