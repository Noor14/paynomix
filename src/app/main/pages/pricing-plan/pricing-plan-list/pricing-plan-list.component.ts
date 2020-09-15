import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pricing-plan-list',
  templateUrl: './pricing-plan-list.component.html',
  styleUrls: ['./pricing-plan-list.component.scss']
})
export class PricingPlanListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns = ['PricingTitle','Reserve', 'DiscountRate','MonthlyFee','FeeAmount','GateWayTransactionFee'];
  public dataSource = new MatTableDataSource<any>(
    [
      { PricingTitle: 'Standard Plan',Reserve:50 ,DiscountRate:10,MonthlyFee:200,FeeAmount:3000,GateWayTransactionFee:2000},
      { PricingTitle: 'Standard Plan',Reserve:50 ,DiscountRate:10,MonthlyFee:200,FeeAmount:3000,GateWayTransactionFee:2000},
      { PricingTitle: 'Standard Plan',Reserve:50 ,DiscountRate:10,MonthlyFee:200,FeeAmount:3000,GateWayTransactionFee:2000},
      { PricingTitle: 'Standard Plan',Reserve:50 ,DiscountRate:10,MonthlyFee:200,FeeAmount:3000,GateWayTransactionFee:2000},
      { PricingTitle: 'Standard Plan',Reserve:50 ,DiscountRate:10,MonthlyFee:200,FeeAmount:3000,GateWayTransactionFee:2000},
      { PricingTitle: 'Standard Plan',Reserve:50 ,DiscountRate:10,MonthlyFee:200,FeeAmount:3000,GateWayTransactionFee:2000},
      { PricingTitle: 'Standard Plan',Reserve:50 ,DiscountRate:10,MonthlyFee:200,FeeAmount:3000,GateWayTransactionFee:2000},
      { PricingTitle: 'Standard Plan',Reserve:50 ,DiscountRate:10,MonthlyFee:200,FeeAmount:3000,GateWayTransactionFee:2000},
      { PricingTitle: 'Standard Plan',Reserve:50 ,DiscountRate:10,MonthlyFee:200,FeeAmount:3000,GateWayTransactionFee:2000},
      { PricingTitle: 'Standard Plan',Reserve:50 ,DiscountRate:10,MonthlyFee:200,FeeAmount:3000,GateWayTransactionFee:2000},
      { PricingTitle: 'Standard Plan',Reserve:50 ,DiscountRate:10,MonthlyFee:200,FeeAmount:3000,GateWayTransactionFee:2000},
      { PricingTitle: 'Standard Plan',Reserve:50 ,DiscountRate:10,MonthlyFee:200,FeeAmount:3000,GateWayTransactionFee:2000},
      { PricingTitle: 'Standard Plan',Reserve:50 ,DiscountRate:10,MonthlyFee:200,FeeAmount:3000,GateWayTransactionFee:2000},
      { PricingTitle: 'Standard Plan',Reserve:50 ,DiscountRate:10,MonthlyFee:200,FeeAmount:3000,GateWayTransactionFee:200},
      
    ])
  constructor() { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
