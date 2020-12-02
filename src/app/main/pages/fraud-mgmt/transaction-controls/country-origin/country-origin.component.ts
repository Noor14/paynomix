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
    list1 = globalConfig.Countries.countries;
    list2 = [];
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
    item.selected = !item.selected;
  }

  public moveSelected(direction) {

   

    if (direction === 'left') {
        this.RemoveArr = this.list2.map((item: any) => {
            return {
                "FraudDescription":item.name,
                "IsActive":false,
                ...this.roleObject
            }
          });
        
         this.list2 = this.list2.filter(i => !i.selected);
        
    } else {
      this.list1.forEach(item => {
        if (item.selected) {
          this.list2.push(item);

          this.selectedArr.push(
            {
                "FraudDescription": item.name,
                "IsActive": true,
                ...this.roleObject
              }
          )

        }
      });
      this.list1 = this.list1.filter(i => !i.selected);
    

    }
  }

  public moveAll(direction) {
    if (direction === 'left') {
      this.list1 = [...this.list1, ...this.list2];
      this.list2 = [];
    } else {
      this.list2 = [...this.list2, ...this.list1];
      this.list1 = [];
    }
  }


  saveSettings(){

    if(this.RemoveArr.hasOwnProperty('IsActive') == false){
        this._pricingPlanService.updateCountrySettings(this.RemoveArr).then((res: any) => {
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
    this._pricingPlanService.getCountrySettings(this.roleObject).then((res: any) => {
      if(!res.StatusCode){
        this.list2 = res.Response.map((item: any) => {
            
            return {
              "name": item.FraudDescription, 
              "isActive": item.IsActive,
            };
          });
      }else{
        this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn);
      }
  });
}


}
