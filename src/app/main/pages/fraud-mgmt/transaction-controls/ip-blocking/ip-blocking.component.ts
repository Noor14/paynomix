import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ip-blocking',
  templateUrl: './ip-blocking.component.html',
  styleUrls: ['./ip-blocking.component.scss']
})
export class IpBlockingComponent implements OnInit {
  public ipBlocking: FormGroup;
  public ipAddressForm: FormGroup;
  public data: any;
  constructor(
    private readonly _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createIpAddressForm()
    this.data = [
      {
        PartnerName: 'abc',
        DBAName: 'bcaa',
        ContactPerson: '22313'
      },
      {
        PartnerName: 'abc',
        DBAName: 'bcaa',
        ContactPerson: '22313'
      }
    ]
  }
  createIpAddressForm(): void{
    this.ipAddressForm = this._formBuilder.group({
      FraudDescription: ['', Validators.required],
      FraudType: [2, Validators.required],
    })
  }
  addIP():any {

  }

}
