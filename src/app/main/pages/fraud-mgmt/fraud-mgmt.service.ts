import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BaseService } from '@fuse/services/base.service';

@Injectable({providedIn: 'root'})
export class FraudMgmtService extends BaseService {
    constructor(_http: HttpClient) {
        super(_http);
       }

       saveCountrySettings(obj : any) {
        const url = `${environment.apiURL}/Fraud`;
        return this.post(url, obj);
       }
      updateCountrySettings(obj : any) {
        const url = `${environment.apiURL}/Fraud/Update`;
        return this.post(url, obj);
       }

      getCountrySettings(obj : any) {
        const url = `${environment.apiURL}/Fraud/Search`;
        return this.post(url, obj);
       }
       lockSettings(obj:any) {
        const url = `${environment.apiURL}Fraud/GetLockSettings`;
        return this.post(url, obj);
      }
    }