import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@fuse/services/base.service';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MerchantService extends BaseService {
    constructor(_http: HttpClient) {
        super(_http);
    }
    getMerchantDetail(id: string) {
        const url = `${environment.apiURL}Merchant/GetMerchantById/${id}`;
        return this.get(url);
    }
    merchantList(obj: any) {
        const url = `${environment.apiURL}Merchant/Search`;
        return this.post(url, obj);
    }
    verifyMerchant(obj: any) {
        const url = `${environment.apiURL}Merchant/IsMerchantExist`;
        return this.post(url, obj);
    }
    saveMerchant(obj: any) {
        const url = `${environment.apiURL}Merchant`;
        return this.post(url, obj);
    }

}