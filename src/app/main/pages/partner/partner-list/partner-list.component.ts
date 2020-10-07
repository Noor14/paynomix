import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartnerService } from '../partner.service';
debugger;
@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns = ['PartnerName', 'DBAName', 'FirstName', 'LastName', 'Action'];
  public dataSource = new MatTableDataSource<any>()
  public partners: any = [];
  private _unsubscribeAll: Subject<any>;
  
      /**
      * Constructor
      *
      * @param {PartnerService} _partnerService
      * @param {UserConfigService} _userConfigService
      */
     
     constructor(
       private readonly _partnerService: PartnerService,
       private readonly _userConfigService: UserConfigService
   ) { 
             // Set the private defaults
             this._unsubscribeAll = new Subject();
   }
  
    ngOnInit(): void {
      debugger;
      this._userConfigService.userModeChange
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => this.getPartners())
    }

    ngOnDestroy(): void {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
    }
  
    getPartners(): void{
      debugger;
      this._partnerService.partnerList(this._userConfigService.getUserMode())
      .then((res: any) => {
          if(res && !res.StatusCode){
              this.partners = res.Response;
              this.dataSource.data = this.partners;
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
          }
      }).catch((err: HttpErrorResponse)=>(console.log))
    }

}
