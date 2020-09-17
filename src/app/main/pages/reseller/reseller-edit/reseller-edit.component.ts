import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { snackBarConfig } from 'constants/globalFunctions';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ResellerService } from '../reseller.service';

@Component({
  selector: 'app-reseller-edit',
  templateUrl: './reseller-edit.component.html',
  styleUrls: ['./reseller-edit.component.scss']
})
export class ResellerEditComponent implements OnInit, OnDestroy {

  public resellerInfo: any = {};
  private _unsubscribeAll: Subject<any>;
  /**
     * Constructor
     *
     * @param {ResellerService} _resellerService
     * @param {ActivatedRoute} _route
     * @param {MatSnackBar} _snackBar
     * @param {Router} _router
     */
  constructor(
    private readonly _route : ActivatedRoute,
    private readonly _resellerService: ResellerService,
    private readonly _snackBar: MatSnackBar,
    private readonly _router: Router

  ) { 
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._route.paramMap
    .pipe(
      takeUntil(this._unsubscribeAll),
      map((param) => param.get('id')),
      switchMap((id) =>
        this._resellerService.getResellerDetail(id)
      ),
      tap((res: any) => (this.resellerInfo = res.Response)),
    )
    .subscribe();

  }

  updateReseller(event){
    this._resellerService.saveReseller(event)
    .then((res: any) => {
      if(res && !res.StatusCode){
        this._snackBar.open('Reseller updated', '', snackBarConfig);
        this._router.navigate(['/pages/reseller/reseller-list']);

      }
  }).catch((err: HttpErrorResponse)=>(console.log))
  
  }

  ngOnDestroy(): void{
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
