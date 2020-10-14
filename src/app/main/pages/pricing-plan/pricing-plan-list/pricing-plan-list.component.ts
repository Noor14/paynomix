import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AssigneeDialogComponent } from '@fuse/components/assignee-dialog/assignee-dialog.component';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MerchantService } from '../../merchant/merchant.service';
import { PartnerService } from '../../partner/partner.service';
import { ResellerService } from '../../reseller/reseller.service';
import { PricingPlanService } from '../pricing-plan.service';

@Component({
  selector: 'app-pricing-plan-list',
  templateUrl: './pricing-plan-list.component.html',
  styleUrls: ['./pricing-plan-list.component.scss']
})
export class PricingPlanListComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns = ['PricingTitle','Reserve', 'DiscountRate', 'MonthlyMinimunFee', 'FeeAmount', 'TransactionFee', 'AssignCount', 'Action'];
  public dataSource = new MatTableDataSource<any>();
  public pricingPlans: any[] = [];
  @Input() getPricingPlanBy: any;
  private _unsubscribeAll: Subject<any>;
  public assignPricingPlan: any = {}

    /**
    * Constructor
    *
    * @param {PricingPlanService} _pricingPlanService
    * @param {UserConfigService} _userConfigService
    * @param {MerchantService} _merchantService
    * @param {ResellerService} _resellerService
    * @param {PartnerService} _partnerService
    */
   
   constructor(
     private readonly _pricingPlanService: PricingPlanService,
     private readonly _userConfigService: UserConfigService,
     private readonly _merchantService: MerchantService,
     private readonly _resellerService: ResellerService,
     private readonly _partnerService: PartnerService,
     private readonly _dialog: MatDialog
 ) { 
           // Set the private defaults
           this._unsubscribeAll = new Subject();
 }

  ngOnInit(): void {
    // this._userConfigService.userModeChange
    // .pipe(takeUntil(this._unsubscribeAll))
    // .subscribe(() => this.getPricingPlans(this._userConfigService.getUserMode()))
  }

  ngOnChanges(): void{
    if(this.getPricingPlanBy && Object.keys(this.getPricingPlanBy).length && 
    Object.values(this.getPricingPlanBy).toString()){
      this.getPricingPlans(this.getPricingPlanBy)
    }
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  openDialog() {
    this._dialog.open(AssigneeDialogComponent, {width: '550px'});
  }


  getPricingPlans(obj: any): void{
    this._pricingPlanService.pricingPlanList(obj)
    .then((res: any) => {
        if(res && !res.StatusCode){
          if(res.Response && res.Response.length){
            this.pricingPlans = res.Response;
            this.dataSource.data = this.pricingPlans;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.assignPricingPlan = this.assignPlan(obj);
          }

        }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

  getPartners(obj: any): Promise<any[]>{
   return this._partnerService.partnerList(obj)
    .then((res: any) => {
        if(res && !res.StatusCode){
            return res.Response;
        }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

  getResellers(obj: any): Promise<any[]>{
   return this._resellerService.resellerList(obj)
    .then((res: any) => {
        if(res && !res.StatusCode){
            return res.Response;
        }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

  getMerchants(obj: any): Promise<any[]>{
    return this._merchantService.merchantList(obj)
    .then((res: any) => {
        if(res && !res.StatusCode){
            return  res.Response;
        }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }


  assignPlan(obj: any): any{
    const object:any = {};
    if(obj
      && !Object.keys(obj).length){
        object.AssignTo = 'Partner';
        this.getPartners(obj).then(res => object.AssigneeList = res)
      }
      else if(obj
        && obj.hasOwnProperty('PartnerId')){
          object.AssignTo = 'Reseller';
          this.getResellers(obj).then(res => object.AssigneeList = res)

      }else{
        object.AssignTo = 'Merchant';
        this.getMerchants(obj).then(res => object.AssigneeList = res)

      }
      return object;
  }

}
