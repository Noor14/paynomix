import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@fuse/services/base.service';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PartnerService extends BaseService {
    constructor(_http: HttpClient) {
        super(_http);
       }
       getPartnerDetail(id: string){
        const url = `${environment.apiURL}Partner/GetPartnerById/${id}`;
        return this.get(url);
       }
       partnerList(obj: any): any{
        const url = `${environment.apiURL}Partner/Search`;
         return this.post(url, obj);
        }
       savePartner(obj: any){
            const url = `${environment.apiURL}Partner`;
            return this.post(url, obj);   
       }
     
}