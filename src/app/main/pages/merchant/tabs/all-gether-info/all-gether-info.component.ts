import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-all-gether-info',
  templateUrl: './all-gether-info.component.html',
  styleUrls: ['./all-gether-info.component.scss']
})
export class AllGetherInfoComponent implements OnInit {
  @Input() allInfo: any;
  @Output() saveAll = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  submit(){
     this.saveAll.emit();
  }
}
