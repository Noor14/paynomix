import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
  ) { }
  intercept(
    request: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<any>> {
     const object = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'));
     const token = object && object.Token;
     const userID = object && object.UserId;
      if (token) {
        request = request.clone({
            setHeaders: {
              'Content-Type': 'application/json; charset=utf-8',
              'dataType': 'json',
              'userid': userID,
              'authorization': `${token}`
            }
        });
        if (request.url.includes('Setting/MerchantSetting')) {
          request = request.clone(
            { headers: request.headers.delete('Content-Type', 'application/json; charset=utf-8')
          });
      }
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
      }),
      finalize(console.log)

    );
  }
}
