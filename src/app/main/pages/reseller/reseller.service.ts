import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@fuse/services/base.service';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class ResellerService extends BaseService {
    constructor(_http: HttpClient) {
        super(_http);
       }

       getResellerDetail(id: string){
        const url = `${environment.apiURL}Reseller/GetResellerById/${id}`;
        return this.get(url);
       }

       saveReseller(obj: any){
        const url = `${environment.apiURL}Reseller`;
        return this.post(url, obj);   
       }
       
       resellerList(obj: any): any{
        const url = `${environment.apiURL}Reseller/Search`;
         return this.post(url, obj);
        }

};