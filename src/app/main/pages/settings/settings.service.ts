import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BaseService } from '@fuse/services/base.service';

@Injectable({providedIn: 'root'})
export class SettingService extends BaseService {
    constructor(_http: HttpClient) {
        super(_http);
       }

    getSaleSetingByLocationId(LocationId: number): any{
    const url = `${environment.apiURL}Setting/GetRequiredFields/${LocationId}`;
    return this.get(url);
    }

    saveSaleSettingByLocation(data: any[]){
    const url = `${environment.apiURL}Setting/CreateRequiredFields`;
    return this.post(url, data);   
    }
    sendEmail(data) {
        const url = `${environment.apiURL}setting/sendEmail`
        return this.post(url, data);
     } 
}