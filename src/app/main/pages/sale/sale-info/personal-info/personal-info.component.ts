import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { locationConfig } from '../../../../../../constants/globalFunctions';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  public personalInfoForm: FormGroup;
  public locationConfig = locationConfig;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.personalInfoForm = this._formBuilder.group({
    Company: ['', Validators.required],
    CustomerName: ['', Validators.required],
    Email: ['', Validators.required],
    Phone: ['', Validators.required],
    Address: ['', Validators.required],
    City: ['', Validators.required],
    State: ['', Validators.required],
    Country: ['', Validators.required]
  });

  }

}
