import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BaseService } from '@fuse/services/base.service';

@Injectable({providedIn: 'root'})
export class PricingPlanService extends BaseService {
    constructor(_http: HttpClient) {
        super(_http);
       }
       getPricingPlanDetail(id: string){
        const url = `${environment.apiURL}PricingPlan/GetPricingPlanById/${id}`;
        return this.get(url);
       }
       pricingPlanList(obj: any): any{
        const url = `${environment.apiURL}PricingPlan/Search`;
         return this.post(url, obj);
        }
       savePricingPlan(obj: any){
            const url = `${environment.apiURL}PricingPlan`;
            return this.post(url, obj);   
        }
       assignPricingPlan(obj : any) {
        const url = `${environment.apiURL}PricingPlan/AssignPricingPlan`
        return this.post(url, obj);
       }
    }