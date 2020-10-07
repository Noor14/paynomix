import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@fuse/services/base.service';
import { environment } from 'environments/environment';

debugger;
@Injectable({providedIn: 'root'})
export class MakesaleService extends BaseService {
    constructor(_http: HttpClient) {
        super(_http);
       }
     
     
       getMerchantLocation(): any{
           debugger;
        const url = `${environment.apiURL}Location`;
         return this.get(url);
        }
      
    
}