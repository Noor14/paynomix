import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as globalConfig  from '../../../../../../constants/globalFunctions';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit, OnChanges {

  @Input() transactionApproved: any = null;
  @Output() personalInfo = new EventEmitter<string>();
  public personalInfoForm: FormGroup;
  public locationConfig = globalConfig.locationConfig;
  constructor(
    private _formBuilder: FormBuilder) {
       }
  ngOnChanges() {
     if(this.transactionApproved) {
       this.personalInfoForm.reset();
     }
  }

  ngOnInit() {
    this.personalInfoForm = this._formBuilder.group({
    Company: ['', Validators.required],
    CustomerName: ['', Validators.required],
    Email:  ['', [Validators.required, Validators.email, Validators.pattern(globalConfig.validator.emailPattern)]],
    Phone: ['', Validators.required],
    Address: ['', Validators.required],
    City: ['', Validators.required],
    State: ['', Validators.required],
    Country: ['', Validators.required]
  });
  this.personalInfoForm.valueChanges
  .subscribe((form)=> {
    this.personalInfo.emit(form);
  }); 
    
}
}
