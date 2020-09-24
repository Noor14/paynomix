import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private readonly _http: HttpClient) { }
  
  post(url: string, data: any): any {
    const promise = new Promise((resolve, reject) => {
      this._http.post(url, data || {})
        .toPromise()
        .then(
          res => resolve(res)
        )
        .catch(err => reject(err));
    });
    return promise;
  }

  get(url: string): any {
    const promise = new Promise((resolve, reject) => {
      this._http.get(url)
        .toPromise()
        .then(
          res => resolve(res)
        )
        .catch((err: any) => reject(err));
    });
    return promise;
  }

  put(url: string, data: any): any {
    const promise = new Promise((resolve, reject) => {
      this._http.put(url, data)
        .toPromise()
        .then(
          res => resolve(res)
        )
        .catch((err: any) => reject(err));
    });
    return promise;
  }

  delete(url: string): any {
    const promise = new Promise((resolve, reject) => {
      this._http.delete(url)
        .toPromise()
        .then(
          res => resolve(res)
        )
        .catch((err: any) => reject(err));
    });
    return promise;
  }

}
