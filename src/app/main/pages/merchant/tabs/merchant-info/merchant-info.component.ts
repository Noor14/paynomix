import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserConfigService } from '@fuse/services/user.config.service';
import { ResellerService } from '../../../reseller/reseller.service';
import { validator } from 'constants/globalFunctions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-merchant-info',
  templateUrl: './merchant-info.component.html',
  styleUrls: ['./merchant-info.component.scss']
})
export class MerchantInfoComponent implements OnInit, AfterViewInit, OnChanges {

  public merchantInfoForm: FormGroup;
  @Input() merchantInfo: any = null;
  @Output() stepOne = new EventEmitter<any>();
  public resellers: any[] = [];
  private _unsubscribeAll: Subject<any>;
   /**
    * Constructor
    *
    * @param {ResellerService} _resellerService
    * @param {UserConfigService} _userConfigService
    * @param {FormBuilder} _formBuilder
    * 
    */
   
   constructor(
    private readonly _resellerService: ResellerService,
    private readonly _userConfigService: UserConfigService,
    private _formBuilder: FormBuilder

) { 
          // Set the private defaults
          this._unsubscribeAll = new Subject();
}

 ngOnInit(): void {
  this.createMerchantInfoForm();
   this._userConfigService.userModeChange
   .pipe(takeUntil(this._unsubscribeAll))
   .subscribe(() => this.getResellers())
 }

  ngOnChanges(): void{
    if(this.merchantInfo){
      this.createMerchantInfoForm();
      this.merchantInfoForm.patchValue(this.merchantInfo);
      this.stepOne.emit(this.merchantInfoForm);
    }
  }
 
  ngAfterViewInit(): void {
    this.stepOne.emit(this.merchantInfoForm);
  }

  getResellers(): void{
    this._resellerService.resellerList(this._userConfigService.getUserMode())
    .then((res: any) => {
          if(res && !res.StatusCode && res.Response && res.Response.length){
          this.resellers = res.Response.map((item: any) => {
            return {
              id: item.ResellerId, 
              name: item.ResellerName
            };
          });
      }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

  createMerchantInfoForm(): void{
    this.merchantInfoForm = this._formBuilder.group({
      AccountSetupId: [0, Validators.required],
      MerchantUserName: ['', Validators.required],
      MerchantEmail: ['', [Validators.required, Validators.email, Validators.pattern(validator.emailPattern)]],
      PricingPlanID: ['77', Validators.required],
      IpAddress: ['192.168.0.142', Validators.required]
      });
  }
}
