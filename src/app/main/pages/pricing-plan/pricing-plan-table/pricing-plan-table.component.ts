import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { AssigneeDialogComponent } from '@fuse/components/assignee-dialog/assignee-dialog.component';
import { truncateTextLength } from '../../../../../constants/globalFunctions';
import { SlidingPanelService } from '@fuse/components/sliding-panel/sliding-panel.service';
@Component({
  selector: 'app-pricing-plan-table',
  templateUrl: './pricing-plan-table.component.html',
  styleUrls: ['./pricing-plan-table.component.scss'],
  animations   : fuseAnimations
})
export class PricingPlanTableComponent implements OnInit {
  public truncateTextLength = truncateTextLength;
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() data: any;
  @Output() updateList = new EventEmitter<boolean>();
  public actionControlOnHover = -1;
  
  public displayedColumns: string[] = ['PricingTitle', 'Reserve', 'DiscountRate', 'MonthlyMinimunFee', 'PerTransactionFee', 'TransactionFee', 'AssignCount'];
  constructor(
    private readonly _dialog: MatDialog,
    private readonly _slidingPanelService: SlidingPanelService,
  ) { }

  ngOnInit(): void {
    if(this.data){
      this.dataSource.data = this.data.pricingPlans;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  openDialog(PricingPlanID) {
    //console.log(this.data.assignPricingPlan);
    const dialogRef = this._dialog.open(AssigneeDialogComponent, {width: '550px'});
    dialogRef.componentInstance.data ={...this.data.assignPricingPlan, PricingPlanID};
    dialogRef.afterClosed().subscribe(result => {
     if(result){
      this.updateList.emit(result);
     }
  });
   }
   editPricingPlan(value) {
    this._slidingPanelService.getSidebar('slidePanel', 'PricingPlanEditComponent', value).toggleOpen();
   }
   assignPricingPlan(value) {
    this._slidingPanelService.getSidebar('slidePanel', 'AssigneeDialogComponent', value).toggleOpen();
   }

   
 
}
