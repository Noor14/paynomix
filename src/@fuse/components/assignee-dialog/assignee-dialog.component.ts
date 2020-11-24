import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PricingPlanService } from 'app/main/pages/pricing-plan/pricing-plan.service';
import { snackBarConfig, snackBarConfigWarn } from '../../../constants/globalFunctions';
import { SlidingPanelService } from '@fuse/components/sliding-panel/sliding-panel.service';

@Component({
  selector: 'app-assignee-dialog',
  templateUrl: './assignee-dialog.component.html',
  styleUrls: ['./assignee-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssigneeDialogComponent implements OnInit {
  public selectedAssignee = new FormControl([]);
  public selectedChips: any[] = [];
  @Input() data: any;

  /**
 * Constructor
 *
 * @param {PricingPlanService} _pricingPlanService  
 */

  constructor(
    public readonly _dialogRef: MatDialogRef<any>,
    private readonly _pricingPlanService: PricingPlanService,
    private readonly _snackBar: MatSnackBar,
    private _slidingPanelService:SlidingPanelService,

  ) { }

  ngOnInit(): void {
   // this.selectedChips = this.data.AssigneeList && this.data.AssigneeList.filter((obj) =>
     // obj.pricingPlanIds && obj.pricingPlanIds.indexOf(this.data.PricingPlanID) >= 0
    //)
    //if (this.selectedChips && this.selectedChips.length) {
      //const list = this.selectedChips.map(item => item.id)
      //this.selectedAssignee.setValue(list);
    //}
  }

  onChange() {
    this.selectedChips = this.data.AssigneeList.filter(
      (obj: any) => {
        return this.selectedAssignee.value.indexOf(obj.id) >= 0
      })
  }

  onRemoved(id: number, index: number) {
    const list = this.selectedAssignee.value;
    const ind = list.indexOf(id);
    if (ind !== -1) {
      list.splice(index, 1)
      this.selectedAssignee.setValue(list);
    }
    this.selectedChips.splice(index, 1);
  }

  assignPricingPlan() {
    const obj = {
      PricingPlanId: this.data.PricingPlanID,
      UserRoleId: this.data.UserRoleId
    };
    let assignedPricingPlan = [];
    (this.selectedChips.length)?
     assignedPricingPlan = this.selectedChips.map(item => {
       item.EntityId = item.id;
       return item = {...item, ...obj};
      }
      ) : 
      assignedPricingPlan.push(obj);

    this._pricingPlanService.assignPricingPlan(assignedPricingPlan)
      .then((res: any) => {
        if (res && !res.StatusCode) {
          if(this.selectedChips.length){
            this._snackBar.open('Pricing Plan has been assigned successfully!', '', snackBarConfig);
          }else{
            this._snackBar.open('Pricing Plan has been unassigned successfully!', '', snackBarConfig);
          }
          this._dialogRef.close(true);
        } else {
          this._snackBar.open('Pricing Plan has not been assigned yet', '', snackBarConfigWarn);
          this._dialogRef.close();
        }
      }).catch((err: HttpErrorResponse) => (console.log));

  }

}
