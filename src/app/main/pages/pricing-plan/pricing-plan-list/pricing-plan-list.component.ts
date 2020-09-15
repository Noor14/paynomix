import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PricingPlanService } from '../pricing-plan.service';

@Component({
  selector: 'app-pricing-plan-list',
  templateUrl: './pricing-plan-list.component.html',
  styleUrls: ['./pricing-plan-list.component.scss']
})
export class PricingPlanListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns = ['PricingTitle','Reserve', 'DiscountRate', 'MonthlyMinimunFee', 'FeeAmount', 'GateWayTransactionFee', 'Action'];
  public dataSource = new MatTableDataSource<any>();
  public pricingPlans: any= [];
  private _unsubscribeAll: Subject<any>;

    /**
    * Constructor
    *
    * @param {ResellerService} _resellerService
    * @param {UserConfigService} _userConfigService
    */
   
   constructor(
     private readonly _pricingPlanService: PricingPlanService,
     private readonly _userConfigService: UserConfigService
 ) { 
           // Set the private defaults
           this._unsubscribeAll = new Subject();
 }

  ngOnInit(): void {
    this._userConfigService.userModeChange
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(() => this.getPricingPlan())
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
}

    getPricingPlan(): void{
    this._pricingPlanService.pricingPlanList(this._userConfigService.getUserMode())
    .then((res: any) => {
        if(res && !res.StatusCode){
            this.pricingPlans = res.Response;
            this.dataSource.data = this.pricingPlans;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

}
