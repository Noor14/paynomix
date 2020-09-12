import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-merchant-form',
  templateUrl: './merchant-form.component.html',
  styleUrls: ['./merchant-form.component.scss']
})
export class MerchantFormComponent implements OnInit {

  public merchantInfoForm: FormGroup;
  public businessDetailForm: FormGroup;
  @Input() merchantDetail: any = {};

  constructor(private readonly _cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._cdref.detectChanges();
  }

}
