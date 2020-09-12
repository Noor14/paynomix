import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-merchant-create',
  templateUrl: './merchant-create.component.html',
  styleUrls: ['./merchant-create.component.scss']
})
export class MerchantCreateComponent implements OnInit {

  public merchantInfoForm: FormGroup;
  public businessDetailForm: FormGroup;
  public merchantDetail: any = {};

  constructor(private readonly _cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._cdref.detectChanges();
  }

}
