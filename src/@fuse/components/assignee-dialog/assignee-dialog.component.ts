import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { PricingPlanService } from 'app/main/pages/pricing-plan/pricing-plan.service';
import { snackBarConfig, snackBarConfigWarn } from '../../../constants/globalFunctions';

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

    ) { }

  ngOnInit(): void{
      this.selectedChips = this.data.AssigneeList && this.data.AssigneeList.filter((obj) => 
       obj.pricingPlanIds && obj.pricingPlanIds.indexOf(this.data.PricingPlanID) >=0
      )
      if(this.selectedChips && this.selectedChips.length){
        const list = this.selectedChips.map(item => item.id)
        if(this.data.AssignMultiple){
          this.selectedAssignee.setValue(list);
        }
        else{
          this.selectedAssignee.setValue(list.pop());
        }
      }
  }
   
  onChange(){
    this.selectedChips = this.data.AssigneeList.filter(
     (obj:any) => {
       if(this.data.AssignMultiple){
        return this.selectedAssignee.value.indexOf(obj.id) >= 0
       }else{
        return this.selectedAssignee.value == obj.id
       }
    })
  }

  onRemoved(id: number, index: number) {
    if(this.data.AssignMultiple){
      const list = this.selectedAssignee.value;
      const ind = list.indexOf(id);
      if (ind !== -1) {
       list.splice(index, 1)
       this.selectedAssignee.setValue(list);
      }
    }else{
      this.selectedAssignee.reset();
    }
    this.selectedChips.splice(index, 1);
  }

  assignPricingPlan() {
    this.selectedChips.map(obj => {
      obj.EntityId = obj.id;
      obj.PricingPlanId = this.data.PricingPlanID;
      obj.UserRoleId = this.data.UserRoleId
    });
     this._pricingPlanService.assignPricingPlan(this.selectedChips)
     .then((res:any) =>{
        if(res && !res.StatusCode) {
          this._snackBar.open('Pricing Plan has been assigned successfully! ', '', snackBarConfig); 
          this._dialogRef.close(true);
        }else{
          this._snackBar.open('Pricing Plan has not been assigned yet', '', snackBarConfigWarn);
          this._dialogRef.close();
        }
     }).catch((err: HttpErrorResponse)=>(console.log));

  }

}
