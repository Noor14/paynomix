import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleAuthorizationService } from './role-authorization.serivce';

@Injectable({providedIn: 'root'})
export class AuthGuard extends RoleAuthorizationService implements CanActivate, CanActivateChild  {
    
    constructor(
        protected readonly _route: Router
    ) {
      super();
    }

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
      ){
      super(_route);
    }
    canActivate(_next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {

        const userInfo = (localStorage.getItem('userInfo')) ? 
        JSON.parse(localStorage.getItem('userInfo')) : undefined;
        if (userInfo) {
         return this.canLoad(_next);
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
      
      canLoad(_route): boolean {
        const userInfo = (localStorage.getItem('userInfo')) ? 
        JSON.parse(localStorage.getItem('userInfo')) : undefined;
        if(!userInfo){
          this._route.navigate(['login']);
          return false;
         }else{
          if (!this.isAuthorized()) {
            return false;
           }
           const roles = _route.data && _route.data.roles;
           if (roles && roles.length &&  !roles.some(r => this.hasRole(r))) {
             if(!_route.url){
              this._route.navigate(['/pages/dashboard']);
             }
              return false;
            }
            return true;
         }
    
      }
  };