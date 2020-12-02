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
    RemoveArr: any;

   

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


    if (direction === 'left') {
      this.selectedCountries.map((item: any) => {
            return {
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

  public moveAll(direction) {
    if (direction === 'left') {
      this.AllCountries = [...this.AllCountries, ...this.selectedCountries];
      this.selectedCountries = [];
    } else {
      this.selectedCountries = [...this.selectedCountries, ...this.AllCountries];
      this.AllCountries = [];
    }
  }

  saveSettings(){

    if(this.selectedCountries.hasOwnProperty('IsActive') == false){
        this._pricingPlanService.updateCountrySettings(this.selectedCountries).then((res: any) => {
            if(!res.StatusCode){
              this._snackBar.open(res.StatusMessage, '', snackBarConfig);
            }else{
              this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn);
            }
    })
}
    else{
        this._pricingPlanService.saveCountrySettings(this.selectedArr).then((res: any) => {
            if(!res.StatusCode){
              this._snackBar.open(res.StatusMessage, '', snackBarConfig);
            }else{
              this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn);
            }
          })
  };
}
getSettings(){
   var intersections = [];
    this._pricingPlanService.getCountrySettings(this.roleObject).then((res: any) => {
      if(!res.StatusCode){
        debugger;
       res.Response.map((item: any) => {
          this.AllCountries.filter(
            (obj: any) => {
debugger;
   if(obj.name == item.FraudDescription)
   {
       let dumy = {
           'name' : item.FraudDescription,
           IsActive : true
       }
    this.selectedCountries.push(dumy)
   
   }
            })
          })
console.log("this.selectedCountries", this.selectedCountries)
        }
      else
      {
        this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn);
      }
  });
}


}
