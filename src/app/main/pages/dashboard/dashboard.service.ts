import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@fuse/services/base.service';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class DashboardService extends BaseService {
    constructor(_http: HttpClient) {
        super(_http);
       }

       dasboardStats(obj: any): any{
        const url = `${environment.apiURL}dashboard/DashboardData`;
         return this.post(url, obj);
        }
    
}