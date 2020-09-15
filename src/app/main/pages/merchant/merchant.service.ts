import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@fuse/services/base.service';
import { environment } from 'environments/environment';

@Injectable({providedIn: 'root'})
export class MerchantService extends BaseService {
    constructor(_http: HttpClient) {
        super(_http);
       }

       merchantList(obj: any): any{
        const url = `${environment.apiURL}Merchant/Search`;
         return this.post(url, obj || {});
        }
}