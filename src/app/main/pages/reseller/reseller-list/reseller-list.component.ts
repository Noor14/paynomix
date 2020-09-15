import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResellerService } from '../reseller.service';

@Component({
  selector: 'app-reseller-list',
  templateUrl: './reseller-list.component.html',
  styleUrls: ['./reseller-list.component.scss']
})
export class ResellerListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns = ['ResellerName', 'DBAName', 'TelephoneNumber', 'Email', 'Country', 'Action'];
  public dataSource = new MatTableDataSource<any>()
  public resellers: any= [];
  private _unsubscribeAll: Subject<any>;

     /**
     * Constructor
     *
     * @param {ResellerService} _resellerService
     * @param {UserConfigService} _userConfigService
     */
    
    constructor(
      private readonly _resellerService: ResellerService,
      private readonly _userConfigService: UserConfigService
  ) { 
            // Set the private defaults
            this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._userConfigService.userModeChange
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(() => this.getReseller())
  }

  ngOnDestroy(): void {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  getReseller(): void{
    this._resellerService.resellerList(this._userConfigService.getUserMode())
    .then((res: any) => {
        if(res && !res.StatusCode){
            this.resellers = res.Response;
            this.dataSource.data = this.resellers;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

}
