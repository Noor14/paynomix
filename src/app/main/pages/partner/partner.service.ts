import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@fuse/services/base.service';
import { environment } from 'environments/environment';

@Injectable({providedIn: 'root'})
export class PartnerService extends BaseService {
    constructor(_http: HttpClient) {
        super(_http);
       }

       partnerList(obj: any): any{
        const url = `${environment.apiURL}Partner/Search`;
         return this.post(url, obj);
        }
    
}