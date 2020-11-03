import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@fuse/services/base.service';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class UserService extends BaseService {
    constructor(_http: HttpClient) {
        super(_http);
       }

       userList(obj: any): any{
        const url = `${environment.apiURL}User/Search`;
         return this.post(url, obj);
        }
        updateUser(obj: any):any {
            const url = `${environment.apiURL}User`;
            return this.post(url,obj);
          }
    
}