import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleAuthorizationService } from './role-authorization.serivce';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanActivateChild  {
    
    constructor(
        protected _route: Router,
        protected _roleAuthorizationService: RoleAuthorizationService,

    ) { }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }

    canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> {
    
             const userInfo = (localStorage.getItem('userInfo')) ? 
             JSON.parse(localStorage.getItem('userInfo')) : undefined;
             if(!userInfo){
                return true;
             }
             else{
                if(this._route && this._route.url && this._route.url !== '/'){
                    this._route.navigate([this._route.url]);
                }else{
                    this._route.navigate(['/pages/dashboard']);
                }
                return false;
            }
        }
};

@Injectable({
    providedIn: 'root'
  })
  export class PageGuard extends AuthGuard {
    constructor(
      _route: Router,  
      _roleAuthorizationService: RoleAuthorizationService,
      ){
      super(_route, _roleAuthorizationService)
    }
    canActivate(next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {

        const userInfo = (localStorage.getItem('userInfo')) ? 
        JSON.parse(localStorage.getItem('userInfo')) : undefined;
        if (userInfo) {
          const roles = next.data.roles;
        //   if(!this._roleAuthorizationService.isAuthorized()){
        //     return false;
        //   }
        //   else if (roles && !roles.some(r => this._roleAuthorizationService.hasRole(r))) {
        //     return false;
        //   }
          return true;
        }
        else {
            if(this._route && this._route.url && this._route.url !== '/'){
                this._route.navigate([this._route.url]);
              }else{
                this._route.navigate(['login']);
              }
            return false;
        }
      }
      
      canLoad(_route: Route): boolean {
         const roles = _route.data && _route.data.roles;
         if(!this._roleAuthorizationService.isAuthorized()){
            return false;
          }
          else if (roles && !roles.some(r => this._roleAuthorizationService.hasRole(r))) {
            return false;
          }
            return true;
      }
  };