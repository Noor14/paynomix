import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@fuse/services/base.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionControlsService extends BaseService {

  constructor(_http: HttpClient) {
    super(_http);
   }
  addIpAddress(obj: any){
    const url = `${environment.apiURL}Fraud`;
    return this.post(url, obj);
  }
  getIpAddress(obj: any){
    const url = `${environment.apiURL}Fraud/Search`;
    return this.post(url, obj);
  }
  ipBlockingStatus(obj: any) {
    const url = `${environment.apiURL}Fraud/FraudStatus`;
    return this.post(url, obj);
  }
  lockControls(obj:any) {
    const url = `${environment.apiURL}Fraud/LockSetting`;
    return this.post(url, obj);
  }
  updateIpAddress(obj:any) {
    const url = `${environment.apiURL}Fraud/Update`;
    return this.post(url, obj);
  }
}
