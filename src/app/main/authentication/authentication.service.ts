import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@fuse/services/base.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {

  constructor(_http: HttpClient) {
    super(_http);
   }
   signIn(object: any): any{
     const url = `${environment.apiURL}login`;
     return this.post(url, object);
   }


   resetPassword(object: any): any{
    const url = `${environment.apiURL}Login/ResetPassword`;
    return this.post(url, object);
  }


}
