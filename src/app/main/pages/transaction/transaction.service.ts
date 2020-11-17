import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@fuse/services/base.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService {

  constructor(_http: HttpClient) {
    super(_http);
  }
  transactionList(obj: any): any {
    const url = `${environment.apiURL}/Transaction/Search`;
    return this.post(url, obj);
  }
  getTransactionDetail(id: string) {
    const url = `${environment.apiURL}Transaction/GetTransactionById/${id}`;
    return this.get(url);
  } 
  refundTransaction(data):any {
    const url = `${environment.apiURL}Transaction/Refund`;
    return this.post(url, data);
}
}
