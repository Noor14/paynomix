import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as globalConfig  from '../../../../../../constants/globalFunctions';
import { validateRequiredControl } from '../../../../../../constants/globalFunctions';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit, OnChanges {

  @Input() resetPersonalInfo: boolean = false;
  @Output() personalInfo = new EventEmitter<string>();
  public personalInfoForm: FormGroup;
  @Input() requiredFields: any;
  public locationConfig = globalConfig.locationConfig;
  constructor(
    private _formBuilder: FormBuilder) {
       }

  ngOnInit(): void { 
    this.createPersonalInfoForm()
  }
  ngOnChanges(): void {
    if(this.resetPersonalInfo) {
      this.personalInfoForm.reset();
    }
   //  if(this.requiredFields) {
     //  this.createPersonalInfoForm()
   //  }
 }
  createPersonalInfoForm(){
    this.personalInfoForm = this._formBuilder.group({
      Company: [''],
      CustomerName: [''],
      Email:  ['', [Validators.email, Validators.pattern(globalConfig.validator.emailPattern)]],
      Phone: [''],
      Address: [''],
      City: [''],
      State: [''],
      Country: ['']
    });
    this.personalInfoForm.valueChanges
    .subscribe((form)=> {
      this.personalInfo.emit(form);
    }); 
      
  }
}

