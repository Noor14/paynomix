import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@fuse/services/base.service';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class FundManagerService extends BaseService {
    constructor(_http: HttpClient) {
        super(_http);
       }
       fundingList(obj: any): any{
        const url = `${environment.apiURL}Transaction/SearchFundTransaction`;
         return this.post(url, obj);
        }
       fundTransfer(obj: any){
            const url = `${environment.apiURL}Transaction/TransferFunds`;
            return this.post(url, obj);   
       }
    
}