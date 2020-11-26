import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private readonly _router: Router,
    private _fuseProgressBarService: FuseProgressBarService,
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
              'userid': `${userID}`,
              'authorization': `${token}`
            }
        });
        if (request.url.includes('Setting/MerchantSetting')) {
          request = request.clone(
            { headers: request.headers.delete('Content-Type', 'application/json; charset=utf-8')
          });
      }
    }
    this._fuseProgressBarService.show();
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
                this._fuseProgressBarService.hide();

                // Checking if it is an Authentication Error (401)
                if (err.status === 401) {
                  // <Log the user out of your application code>
                  localStorage.clear();
                  this._router.navigate([ 'login' ]);
                  // return throwError(err);
                }
                // If it is not an authentication error, just throw it
        return throwError(err);
      }),
      finalize(()=>this._fuseProgressBarService.hide())

    );
  }
}
