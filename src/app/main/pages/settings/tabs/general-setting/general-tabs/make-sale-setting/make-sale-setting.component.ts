import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserConfigService } from '@fuse/services/user.config.service';
import { MerchantService } from '../../../../../merchant/merchant.service';
import { SaleService } from '../../../../../sale/sale.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { SettingService } from '../../../../settings.service';
import { snackBarConfig, validateAllFormFields } from '../../../../../../../../constants/globalFunctions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-make-sale-setting',
  templateUrl: './make-sale-setting.component.html',
  styleUrls: ['./make-sale-setting.component.scss'],
  animations   : fuseAnimations

})
export class MakeSaleSettingComponent implements OnInit, OnDestroy {
  public merchants: any[] = [];
  public locations: any[] = [];
  public makeSaleSettings: any;
  private _unsubscribeAll: Subject<any>;
  public makeSaleSettingForm: FormGroup;

    /**
    * Constructor
    *
    * @param {MerchantService} _merchantService
    * @param {UserConfigService} _userConfigService
    * @param {SettingService} _settingService
    * @param {SaleService} _saleService
    * @param {MatSnackBar} _snackBar
    * @param {FormBuilder} _formBuilder
    */
   
   constructor(
    private readonly _merchantService: MerchantService,
    private readonly _saleService: SaleService,
    private readonly _formBuilder: FormBuilder,
    private readonly _userConfigService: UserConfigService,
    private readonly _settingService: SettingService,
    private readonly _snackBar: MatSnackBar

) { 
          // Set the private defaults
          this._unsubscribeAll = new Subject();
}

  ngOnInit(): void {
    this._userConfigService.userModeChange
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(() => this.getMerchants());

    this.makeSaleSettingForm = this._formBuilder.group({
      MerchantId : ['' , Validators.required],
      LocationId: [{value: '', disabled: true} , Validators.required],
      SaleSetting: this._formBuilder.array([])
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getMerchants(): void{
    this._merchantService.merchantList(this._userConfigService.getUserMode())
    .then((res: any) => {
        if(res && !res.StatusCode){
            this.reset();
            this.makeSaleSettingForm.controls.SaleSetting['controls'] = [];
            this.merchants =  res.Response.filter(data => data.MerchantAccountSetup).sort((a,b)=> 
            a.MerchantAccountSetup.MerchantUserName.localeCompare(b.MerchantAccountSetup.MerchantUserName))
        }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

  settingFields(data: any){
    const saleSetting = this.makeSaleSettingForm.controls.SaleSetting as FormArray;
    data.forEach((item: any) => {
     const obj = {
        [item.ControlName]: [item.IsRequired]
      };
      const formGroup  = this._formBuilder.group(obj);
      saleSetting.push(formGroup);
    });
    
  }

  onMerchantSelect(): void{
    const obj = {MerchantId: this.makeSaleSettingForm.controls.MerchantId.value};
    this.makeSaleSettingForm.controls.LocationId.reset();
    this.makeSaleSettingForm.controls.SaleSetting['controls'] = [];
    this.makeSaleSettingForm.controls.LocationId.disable();
    this._saleService.locationList(obj).then((res: any)=>{
      if(res && !res.StatusCode){
            this.locations =  res.Response.sort((a,b)=> 
            a.Displayname.localeCompare(b.Displayname));
        this.makeSaleSettingForm.controls.LocationId.enable();
      }
    })
  }
  onSelectMerchantLocation(): void{
    const locationId = this.makeSaleSettingForm.controls.LocationId.value;
    this._settingService.getSaleSetingByLocationId(locationId).then((res: any)=>{
      if(res && !res.StatusCode){
        this.makeSaleSettings = res.Response;
        this.settingFields(res.Response);
      }
    });
  }
  reset(){
    this.makeSaleSettingForm.reset();
    this.makeSaleSettingForm.controls.LocationId.disable();
  }
  save(){
    if(this.makeSaleSettingForm.invalid){
      validateAllFormFields(this.makeSaleSettingForm)

    }else{
      const locationId = this.makeSaleSettingForm.controls.LocationId.value;
      this.makeSaleSettings.map(obj => {
        obj.LocationId =  locationId;
        this.makeSaleSettingForm.value.SaleSetting.filter(control => {
              if (Object.keys(control).indexOf(obj.ControlName) !== -1) {
                obj.IsRequired = control[obj.ControlName];
                return obj;
              }
          });
        });
        this._settingService.saveSaleSettingByLocation(this.makeSaleSettings).then((res: any)=>{
          if(res && !res.StatusCode){
            this._snackBar.open('Settings saved successfully', '' , snackBarConfig)
          }
        });
    }


  }

}
