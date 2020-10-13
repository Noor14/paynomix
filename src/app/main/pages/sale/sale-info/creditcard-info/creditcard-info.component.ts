import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-creditcard-info',
  templateUrl: './creditcard-info.component.html',
  styleUrls: ['./creditcard-info.component.scss'],
  animations   : fuseAnimations

})
export class CreditcardInfoComponent implements OnInit {

  public creditcardForm: FormGroup
  constructor(
    private readonly _formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.creditcardForm = this._formBuilder.group({
      CardholderName: ['', Validators.required],
      CardNumber: ['', Validators.required],
      CardExpiration: ['', Validators.required],
      SecurityCode:  ['', Validators.required],
      StreetAddress:  ['', Validators.required],
      ZipCode: ['', Validators.required]
    });
  }


}
