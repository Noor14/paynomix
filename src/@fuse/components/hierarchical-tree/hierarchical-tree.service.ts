import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@fuse/services/base.service';
import { environment } from 'environments/environment';

@Injectable()
export class HierarchicalTreeService  extends BaseService {

  constructor(_http: HttpClient) {
    super(_http);
  }
  getHierarchyTree(){
    const url = `${environment.apiURL}Dashboard/Hierarchy`;
    return this.get(url);
}
   
}
