import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as globalConfig from '../../../../../constants/globalFunctions';
import { PartnerService } from '../../partner/partner.service';

@Component({
  selector: 'app-reseller-form',
  templateUrl: './reseller-form.component.html',
  styleUrls: ['./reseller-form.component.scss']
})
export class ResellerFormComponent implements OnInit, OnDestroy, OnChanges {

  public resellerForm: FormGroup;
  public globalConfig = globalConfig;
  public partners: any = [];
  @Output() submitForm = new EventEmitter<any>();
  @Input() resellerDetail: any = null;
  private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     * @param {UserConfigService} _userConfigService
     * @param {PartnerService} _partnerService
     */
    constructor(
      private readonly _formBuilder: FormBuilder,
      private readonly _userConfigService: UserConfigService,
      private readonly _partnerService: PartnerService,

  ) { 
      // Set the private defaults
      this._unsubscribeAll = new Subject();
  }


  ngOnInit(): void {
    this._userConfigService.userModeChange
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(() => this.getPartners())
    this.createResellerForm()
 }


 ngOnDestroy(): void {
  // Unsubscribe from all subscriptions
  this._unsubscribeAll.next();
  this._unsubscribeAll.complete();
}
createResellerForm(): void {
  this.resellerForm = this._formBuilder.group({
    ResellerId: [0, Validators.required],
    ResellerName: ['', Validators.required],
    PartnerId: ['', Validators.required],
    DBAName: [''],
    TelephoneNumber: ['', Validators.required],
    TelephoneExt: [''],
    AlternativePhoneNumber: [''],
    AlternativePhoneExt: [''],
    Fax: [''],
    Email: ['', [Validators.required, Validators.email, Validators.pattern(globalConfig.validator.emailPattern)]],
    AlternateEmail:['', [Validators.email, Validators.pattern(globalConfig.validator.emailPattern)]],
    Address1: ['', Validators.required],
    Country: ['', Validators.required],
    City: ['', Validators.required],
    State: ['', Validators.required],
    Zip: ['', [Validators.required, Validators.maxLength(globalConfig.validator.zipMaxLength)]],
    TaxId: [''],
  });

}

ngOnChanges(){
  if(this.resellerDetail){
    this.createResellerForm()
  this.resellerForm.patchValue(this.resellerDetail)
  }
}

getPartners(): void{
  this._partnerService.partnerList(this._userConfigService.getUserMode())
  .then((res: any) => {
      if(res && !res.StatusCode){
          this.partners = res.Response;
      }
  }).catch((err: HttpErrorResponse)=>(console.log))
  }

 submit(){
   if(this.resellerForm.valid){
     this.submitForm.emit(this.resellerForm.value);
   }else{
    globalConfig.validateAllFormFields(this.resellerForm)
   }
 }


}

