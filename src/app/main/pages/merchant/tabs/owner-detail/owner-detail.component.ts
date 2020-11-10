import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { locationConfig, validator } from '../../../../../../constants/globalFunctions';
import * as moment from 'moment';
@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.scss']
})
export class OwnerDetailComponent implements OnInit {
 
  public locationObj = locationConfig;
  public validatorObj = validator; 
  
  @Input() ownerDetail: any = null;
  public ownerDetailForm: FormGroup;
  @Output() stepThree = new EventEmitter<any>();
  public maxDate = moment();

  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _formBuilder: FormBuilder,
   
) { 
  this.maxDate = new Date();
}

  ngOnInit(): void {
    debugger;
    this.createOwnerDetailForm()
    
    
  }
  createOwnerDetailForm(): void{
    this.ownerDetailForm = this._formBuilder.group({
      MerchantId: [0, Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      DOB: ['', Validators.required],
      SSN: [''],
      DrivingLicense: [''],
      DLState: [''],
      Address1: ['', Validators.required],
      Address2: [''],
      City: ['', Validators.required],
      Country: ['US', Validators.required],
      State: ['', Validators.required],
      Zip: ['', [Validators.required, Validators.maxLength(validator.zipMaxLength)]],
      Phone: ['', Validators.required],
      Email: ['', [Validators.email, Validators.pattern(validator.emailPattern)]],
      BackDocLink: [''],
      FrontDocLink: [''],
  });
  }
  ngOnChanges(): void{
    if(this.ownerDetail){
      if(!this.ownerDetailForm){
        this.createOwnerDetailForm();
        this.stepThree.emit(this.ownerDetailForm);
      }else{
        this.ownerDetailForm.patchValue(this.ownerDetail);
      }
    }
  }
  ngAfterViewInit(): void {
    this.stepThree.emit(this.ownerDetailForm);
  }

}
