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
    const {Token, UserId} = JSON.parse(localStorage.getItem('userInfo'));
    if (Token) {
      request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json; charset=utf-8',
            'dataType': 'json',
            'userid': UserId,
            'authorization': `${Token}`
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
