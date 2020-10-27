import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-all-gether-info',
  templateUrl: './all-gether-info.component.html',
  styleUrls: ['./all-gether-info.component.scss']
})
export class AllGetherInfoComponent implements OnInit {
  @Input() allInfo: any;
  @Input() step: any;
  @Output() saveAll = new EventEmitter<any>();

  constructor(private readonly _dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  moveToStep(index: number){
    this.step.selectedIndex = index;
  }
  submit(){
     this.saveAll.emit();
  }
}
