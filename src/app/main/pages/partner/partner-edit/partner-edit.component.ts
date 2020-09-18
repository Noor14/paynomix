import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { snackBarConfig } from 'constants/globalFunctions';
import { Subject } from 'rxjs';
import { takeUntil, map, switchMap, tap } from 'rxjs/operators';
import { PartnerService } from '../partner.service';

@Component({
  selector: 'app-partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: ['./partner-edit.component.scss']
})
export class PartnerEditComponent implements OnInit, OnDestroy {

  public resellerInfo: any = {};
  private _unsubscribeAll: Subject<any>;
  /**
     * Constructor
     *
     * @param {PartnerService} _partnerService
     * @param {ActivatedRoute} _route
     * @param {MatSnackBar} _snackBar
     * @param {Router} _router
     */
  constructor(
    private readonly _route : ActivatedRoute,
    private readonly _partnerService: PartnerService,
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
        this._partnerService.getPartnerDetail(id)
      ),
      tap((res: any) => (this.resellerInfo = res.Response)),
    )
    .subscribe();

  }

  updatePartner(event){
    this._partnerService.savePartner(event)
    .then((res: any) => {
      if(res && !res.StatusCode){
        this._snackBar.open('Partner updated', '', snackBarConfig);
        this._router.navigate(['/pages/partner/partner-list']);

      }
  }).catch((err: HttpErrorResponse)=>(console.log))
  
  }

  ngOnDestroy(): void{
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
