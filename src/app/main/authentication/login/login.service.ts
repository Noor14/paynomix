import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@fuse/services/base.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  constructor(_http: HttpClient) {
    super(_http)
   }
   signIn(object: any){
     const url = `${environment.apiURL}login`;
     return this.post(url,object)
   }
}
