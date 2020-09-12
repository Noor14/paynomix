import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-all-gether-info',
  templateUrl: './all-gether-info.component.html',
  styleUrls: ['./all-gether-info.component.scss']
})
export class AllGetherInfoComponent implements OnInit {

  @Input() allInfo: any;

  constructor() { }

  ngOnInit(): void {
  }

}
