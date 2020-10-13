import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserConfigService } from '@fuse/services/user.config.service';
import { MerchantService } from '../../../../../merchant/merchant.service';
import { SaleService } from '../../../../../sale/sale.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-make-sale-setting',
  templateUrl: './make-sale-setting.component.html',
  styleUrls: ['./make-sale-setting.component.scss']
})
export class MakeSaleSettingComponent implements OnInit, OnDestroy {
  public merchants: any[] = [];
  public locations: any[] = [];
  private _unsubscribeAll: Subject<any>;
  public makeSaleSettingForm: FormGroup;

    /**
    * Constructor
    *
    * @param {MerchantService} _merchantService
    * @param {UserConfigService} _userConfigService
    * @param {FormBuilder} _formBuilder
    */
   
   constructor(
    private readonly _merchantService: MerchantService,
    private readonly _saleService: SaleService,
    private readonly _formBuilder: FormBuilder,
    private readonly _userConfigService: UserConfigService
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
      LocationId: ['' , Validators.required]
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
            this.merchants = res.Response;
        }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

  onMerchantSelect(): void{
    const obj = {MerchantId: this.makeSaleSettingForm.controls.MerchantId.value};
    this.makeSaleSettingForm.controls.LocationId.reset();
    this._saleService.locationList(obj).then((res: any)=>{
      if(res && !res.StatusCode){
        this.locations = res.Response;
      }
    })
  }

}
