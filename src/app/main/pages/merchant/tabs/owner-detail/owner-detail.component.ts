import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as globalConfig from '../../../../../../constants/globalFunctions';
import * as moment from 'moment';
@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.scss']
})
export class OwnerDetailComponent implements OnInit {
 
  public globalConfig = globalConfig; 
  
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
    private _formBuilder: FormBuilder
) { }

  ngOnInit(): void {
    this.createOwnerDetailForm()
  }
  createOwnerDetailForm(): void{
    this.ownerDetailForm = this._formBuilder.group({
      MerchantId: [0, Validators.required],
      FirstName: ['',[ Validators.required , Validators.maxLength(globalConfig.validator.maxName)]],
      LastName: ['',[ Validators.required , Validators.maxLength(globalConfig.validator.maxName)]],
      DOB: ['', Validators.required],
      SSN: [''],
      DrivingLicense: [''],
      DLState: [''],
      Address1: ['', Validators.required],
      Address2: [''],
      City: ['', Validators.required],
      Country: ['US', Validators.required],
      State: ['', Validators.required],
      Zip: ['', [Validators.required, Validators.maxLength(globalConfig.validator.zipMaxLength)]],
      Phone: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email, Validators.pattern(globalConfig.validator.emailPattern)]],
      BackDocLink: [''],
      FrontDocLink: [''],
  });
  }
  ngOnChanges(): void{
    if(this.ownerDetail){
      if(!this.ownerDetailForm){
        this.createOwnerDetailForm();
        this.stepThree.emit(this.ownerDetailForm);
      }
        this.ownerDetailForm.patchValue(this.ownerDetail);
    }
  }
  ngAfterViewInit(): void {
    this.stepThree.emit(this.ownerDetailForm);
  }

}
