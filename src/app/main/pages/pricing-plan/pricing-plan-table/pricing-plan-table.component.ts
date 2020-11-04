import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { AssigneeDialogComponent } from '@fuse/components/assignee-dialog/assignee-dialog.component';

@Component({
  selector: 'app-pricing-plan-table',
  templateUrl: './pricing-plan-table.component.html',
  styleUrls: ['./pricing-plan-table.component.scss'],
  animations   : fuseAnimations
})
export class PricingPlanTableComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() data: any;
  @Output() updateList = new EventEmitter<boolean>();
  
  public displayedColumns: string[] = ['PricingTitle', 'Reserve', 'DiscountRate', 'MonthlyMinimunFee', 'PerTransactionFee', 'TransactionFee', 'AssignCount'];
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

  openDialog(PricingPlanID) {
    const dialogRef = this._dialog.open(AssigneeDialogComponent, {width: '550px'});
    dialogRef.componentInstance.data ={...this.data.assignPricingPlan, PricingPlanID};
    dialogRef.afterClosed().subscribe(result => {
     if(result){
      this.updateList.emit(result);
     }
  });
   }
 
}
