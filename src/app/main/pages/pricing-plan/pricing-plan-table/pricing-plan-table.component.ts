import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AssigneeDialogComponent } from '@fuse/components/assignee-dialog/assignee-dialog.component';

@Component({
  selector: 'app-pricing-plan-table',
  templateUrl: './pricing-plan-table.component.html',
  styleUrls: ['./pricing-plan-table.component.scss']
})
export class PricingPlanTableComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() data: any;
  
  public displayedColumns: string[] = ['PricingTitle', 'Reserve', 'DiscountRate', 'MonthlyMinimunFee', 'FeeAmount', 'TransactionFee', 'AssignCount', 'Action'];
  constructor(
    private readonly _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if(this.data){
      this.dataSource.data = this.data.pricingPlans;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  openDialog() {
    const dialogRef = this._dialog.open(AssigneeDialogComponent, {width: '550px'});
    dialogRef.componentInstance.data = this.data.assignPricingPlan;
   }
 
}
