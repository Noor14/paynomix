import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MerchantService } from '../../../merchant/merchant.service';
import * as globalConfig from '../../../../../../constants/globalFunctions';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class BasicInfoComponent implements OnInit, OnDestroy {

  public basicInfoForm: FormGroup;
  public globalConfig = globalConfig;
  public merchants: any= [];
  private _unsubscribeAll: Subject<any>;
  public  files: File[] = [];
    /**
    * Constructor
    *
    * @param {MerchantService} _merchantService
    * @param {UserConfigService} _userConfigService
    * @param {FormBuilder} _formBuilder
    */
   
   constructor(
     private readonly _merchantService: MerchantService,
     private readonly _userConfigService: UserConfigService,
     private _formBuilder: FormBuilder

 ) { 
      // Set the private defaults
      this._unsubscribeAll = new Subject();
 }

  ngOnInit(): void {
    this.basicInfoForm = this._formBuilder.group({
      MerchantId:[''],
      MerchantUserName: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Address1: ['', Validators.required],
      Address2: [''],
      City: ['', Validators.required],
      State: ['', Validators.required],
      Zip: ['', [Validators.required, Validators.maxLength(globalConfig.validator.zipMaxLength)]],
      Country: ['', Validators.required]
    });
    
    this._userConfigService.userModeChange
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe()
  }
  
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  getDetail(): void{
    this._merchantService.merchantList(this._userConfigService.getUserMode())
    .then((res: any) => {
        if(res && !res.StatusCode && res.Response && res.Response.length){
          this.merchants = res.Response;
        }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

  onFileSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onFileRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
