import { AnimationStyleMetadata } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as globalConfig from '../../../../../../constants/globalFunctions';
import { validateRequiredControl } from '../../../../../../constants/globalFunctions';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit, OnChanges {

  @Input() resetPersonalInfo: boolean = false;
  @Output() personalInfo = new EventEmitter<any>();
  @Output() personalInfoFormValidation = new EventEmitter<any>();
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
    if (this.resetPersonalInfo) {
      this.personalInfoForm.reset();
    }
    if (this.requiredFields && Object.keys(this.requiredFields).length) {
      for (const key in this.requiredFields) {
        if (this.personalInfoForm.value.hasOwnProperty(key)) {
          if (this.requiredFields[key]) {
            if(key != 'Email'){
              this.personalInfoForm.get(key).setValidators([Validators.required]);
              this.personalInfoForm.get(key).updateValueAndValidity();
            }else{
              this.personalInfoForm.get(key).setValidators([
                Validators.required, 
                Validators.email, 
                Validators.pattern(globalConfig.validator.emailPattern)
              ]);
            }
          } else {
            if(key != 'Email'){
              this.personalInfoForm.get(key).setValidators([]);
            }else{
              this.personalInfoForm.get(key).setValidators([
                Validators.email, 
                Validators.pattern(globalConfig.validator.emailPattern)
              ]);
            }
          }
          this.personalInfoForm.get(key).updateValueAndValidity();
        }
      }
    }
  }
  createPersonalInfoForm() {
    this.personalInfoForm = this._formBuilder.group({
      Company: [''],
      CustomerName: [''],
      Email: [''],
      Phone: [''],
      City: [''],
      State: [''],
      Country: ['']
    });
    this.personalInfoForm.valueChanges
      .subscribe((form) => {
        this.personalInfo.emit(form);
        this.personalInfoFormValidation.emit(this.personalInfoForm);
      });

  }
}

