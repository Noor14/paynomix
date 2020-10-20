import { Component, Input, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-assignee-dialog',
  templateUrl: './assignee-dialog.component.html',
  styleUrls: ['./assignee-dialog.component.scss'],
})
export class AssigneeDialogComponent implements OnInit {
  public selectedAssignee = new FormControl([]);
  public selectedChips: any[] = [];
  @Input() data: any;

  constructor() { }

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

}
