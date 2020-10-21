import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@fuse/services/base.service';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class SaleService extends BaseService {
    constructor(_http: HttpClient) {
        super(_http);
       }

    locationList(obj: any){
    const url = `${environment.apiURL}Location/Search`;
    return this.post(url, obj);
    }

    transactionInit(obj: any){
        const url = `${environment.apiURL}Transaction/InitTransaction`;
        return this.post(url, obj);
    }
   
}