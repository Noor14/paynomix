import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserConfigService } from '@fuse/services/user.config.service';
import * as globalConfig from '../../../../../../constants/globalFunctions';
import { snackBarConfig, snackBarConfigWarn } from '../../../../../../constants/globalFunctions';
import { FraudMgmtService } from '../../fraud-mgmt.service';



@Component({
  selector: 'app-country-origin',
  templateUrl: './country-origin.component.html',
  styleUrls: ['./country-origin.component.scss']
})
export class CountryOriginComponent implements OnInit {
    public countryoriginForm: FormGroup;
    public globalConfig = globalConfig;
    public selectedArr = [];
    AllCountries = globalConfig.Countries.countries;
    selectedCountries = [];
    checkForUserRole: any;
    roleObject: any;
    RemoveArr = [];

   

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _pricingPlanService: FraudMgmtService,
    private readonly _snackBar: MatSnackBar,
    private readonly _router: Router,
    private readonly _userConfigService: UserConfigService,

  ) { }

  ngOnInit() {
    this.checkForUserRole = this._userConfigService.getUserMode();
    this.roleObject = (this.checkForUserRole) ? this.checkForUserRole : { EntityId: 0, UserRoleId: 1,"FraudType": 1 }
  this.createCOForm();

  this.getSettings();
  }

  createCOForm(): void{
 
    this.countryoriginForm = this._formBuilder.group({
      BlockOrigin: ['0'],
      SelectedCountries: [''],
      ListedCountryAllowOrBlock: [''],
  });
  
  }

  public toggleSelection(item, list) {
    item.IsActive = !item.IsActive;
  }

  public moveSelected(direction) {


    if (direction === 'remove') {
     this.RemoveArr =  this.selectedCountries.map((item: any) => {
            return {
                "FraudId":item.FraudId,
                "FraudDescription":item.name,
                "IsActive":false,
                ...this.roleObject
            }
          });
    this.selectedCountries = this.AllCountries.filter(i => i.IsActive);
        
    } else {
      this.AllCountries.forEach(item => {
        if (item.IsActive) {
          this.selectedCountries.push(item);
          this.selectedArr.push(
            {
                "FraudDescription": item.name,
                "IsActive": true,
                ...this.roleObject
              }
          )

        }
      });
      this.AllCountries = this.AllCountries.filter(i => !i.IsActive);
    }
  }


  saveSettings(){
    if(this.RemoveArr.length > 0 ){
        const obj = {...this.RemoveArr,
            ...this.countryoriginForm
        }
        this._pricingPlanService.updateCountrySettings(obj).then((res: any) => {
                if(!res.StatusCode){
                  this._snackBar.open(res.StatusMessage, '', snackBarConfig);
                }else{
                  this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn);
                }
        })
    }
    else{
        const obj = {...this.selectedArr,
            ...this.countryoriginForm
        }

        this._pricingPlanService.saveCountrySettings(obj).then((res: any) => {
            if(!res.StatusCode){
              this._snackBar.open(res.StatusMessage, '', snackBarConfig);
            }else{
              this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn);
            }
          })
  };
}
getSettings(){
    const settings = {
        IsActive : true,
        ...this.roleObject
    }
    this._pricingPlanService.getCountrySettings(settings).then((res: any) => {
      if(!res.StatusCode){
       res.Response.map((item: any) => {this.AllCountries.filter((obj: any) => 
        {
         if(obj.name == item.FraudDescription)
             {
                let dumy = { 
                FraudId:item.FraudId,
                name : item.FraudDescription,
                IsActive : true
            }
                this.selectedCountries.push(dumy)
              }
        })
        })
        }
      else
        {
        this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn);
        }
  });
}


}
