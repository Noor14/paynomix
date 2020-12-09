import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserConfigService } from '@fuse/services/user.config.service';
import { FraudMgmtService } from '../../../fraud-mgmt.service';
import * as globalConfig from '../../../../../../../constants/globalFunctions';
import { TransactionControlsService } from '../../transaction-controls.service';
import { snackBarConfig, snackBarConfigWarn } from '../../../../../../../constants/globalFunctions';
@Component({
  selector: 'app-country-blocking-ip',
  templateUrl: './country-blocking-ip.component.html',
  styleUrls: ['./country-blocking-ip.component.scss']
})
export class CountryBlockingIpComponent implements OnInit {
    public countryoriginForm: FormGroup;
    RemoveArr = [];
    public globalConfig = globalConfig;
    public selectedArr = [];
    AllCountries = globalConfig.Countries.countries;
    selectedCountries = [];
   public selectedremovedCountries = []
    roleObject: any;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _FraudMgmtService: FraudMgmtService,
    private readonly _snackBar: MatSnackBar,
    private readonly _router: Router,
    private readonly _userConfigService: UserConfigService,
    private readonly _transactionControlsService: TransactionControlsService



  ) { }

  ngOnInit(): void {
    const checkForUserRole = this._userConfigService.getUserMode();
    this.roleObject = (checkForUserRole) ? checkForUserRole : { EntityId: 0, UserRoleId: 1 }
    this.createCOForm();
    this.getSettings();
  }


  createCOForm(): void{
    this.countryoriginForm = this._formBuilder.group({
      IsAllow: ['']
  });
  
  }

  public toggleSelection(item, list) {
   
    item.IsActive = !item.IsActive;
    if(list ==2){
      const hasValue = Object.values(this.selectedremovedCountries).includes(item);
      !hasValue ? this.selectedremovedCountries.push(item): this.selectedremovedCountries.splice(this.selectedremovedCountries.indexOf(item), 1)
  
    }

   

  }
  public moveSelected(direction) {
   
    if (direction === 'remove' &&  this.selectedremovedCountries.length > 0) {
     
  
        this.removeCountry(this.selectedremovedCountries);
   
    } else {
      this.AllCountries.forEach(item => {
        if (item.IsActive) {
          this.selectedArr.push(
            {
                "FraudDescription": item.name,
                "FraudType": 1,
                "IsActive": true,
                ...this.roleObject
            }
          )

        }
      });
     this.AddCountry(this.selectedArr);
     this.selectedArr =[];
    }
  }


  AddCountry(obj){
    let newObj = [
        ...obj
    ]
        this._FraudMgmtService.saveCountrySettings(newObj).then((res: any) => {
            if(!res.StatusCode){
            this._snackBar.open(res.StatusMessage, '', snackBarConfig);
            this.getSettings();
            }
            else
            {
            this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn);
            }
          })
  };

  removeCountry(obj){
    
    this.selectedremovedCountries = [];
  let objN = [...obj]
    this._FraudMgmtService.updateCountrySettings(objN).then((res: any) => {
                if(!res.StatusCode)
                {
                this._snackBar.open(res.StatusMessage, '', snackBarConfig);
                this.getSettings();
                }
                else{
                this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn);
                }
        })
    

  }

getSettings(){
    this.selectedCountries = [];
    const settings = {
        IsActive : true,
        FraudType : 1
    }
    this._FraudMgmtService.getCountrySettings(settings).then((res: any) => {
      if(!res.StatusCode){
     
       res.Response.map((item: any) => {this.AllCountries.filter((obj: any) => 
        {  
            if(obj.name == item.FraudDescription)
             {
                let objA = { 
                FraudId: item.FraudId,
                name : item.FraudDescription,
                IsActive : true
            }
                this.selectedCountries.push(objA);
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


CountryAllowStatus(): any {
    if(this.countryoriginForm.valid) {
     const checkForUserRole = this._userConfigService.getUserMode();
     const roleObject = (checkForUserRole) ? checkForUserRole : { EntityId: 0, UserRoleId: 1 }
     const obj = {
       ...this.countryoriginForm.value,
       ...roleObject
     }
     this._transactionControlsService.ipBlockingStatus(obj).then((res:any)=>{
       if (res && !res.StatusCode) { 
         this._snackBar.open('Status set Successfully!', '', globalConfig.snackBarConfig);
       //  this.countryoriginForm.controls['IsActive'].reset();
       }
     })
    } else {
        
    }
 }




}
