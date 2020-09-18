import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BaseService } from '@fuse/services/base.service';

@Injectable({providedIn: 'root'})
export class PricingPlanService extends BaseService {
    constructor(_http: HttpClient) {
        super(_http);
       }

       pricingPlanList(obj: any): any{
        const url = `${environment.apiURL}PricingPlan/Search`;
         return this.post(url, obj);
        }
    
}