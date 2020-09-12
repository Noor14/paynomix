import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merchant-edit',
  templateUrl: './merchant-edit.component.html',
  styleUrls: ['./merchant-edit.component.scss']
})
export class MerchantEditComponent implements OnInit {

  public merchantDetail: any = {};

  constructor() { }

  ngOnInit(): void {
  }

}
