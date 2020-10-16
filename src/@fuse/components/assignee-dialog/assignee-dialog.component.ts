import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';

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

  constructor() { }

  ngOnInit() {}
   
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
