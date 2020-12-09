import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserConfigService } from '@fuse/services/user.config.service';
import { snackBarConfig } from 'constants/globalFunctions';
import { TransactionControlsService } from '../../transaction-controls/transaction-controls.service';

@Component({
  selector: 'app-country-status',
  templateUrl: './country-status.component.html',
  styleUrls: ['./country-status.component.scss']
})
export class CountryStatusComponent implements OnInit {
    public countryForm: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _userConfigService: UserConfigService,
    private readonly _transactionControlsService: TransactionControlsService,
    private readonly _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.createcountryForm();
  }
  createcountryForm(): void {
    this.countryForm = this._formBuilder.group({
      IsActive: ['', Validators.required],
      FraudType: [1, Validators.required],
    })
  }
  ipBlockingStatus(): any {
     if(this.countryForm.valid) {
      const checkForUserRole = this._userConfigService.getUserMode();
      const roleObject = (checkForUserRole) ? checkForUserRole : { EntityId: 0, UserRoleId: 1 }
      const obj = {
        ...this.countryForm.value,
        ...roleObject
      }
      this._transactionControlsService.ipBlockingStatus(obj).then((res:any)=>{
        if (res && !res.StatusCode) { 
          this._snackBar.open('Status set Successfully!', '', snackBarConfig);
      
        }
      })
     } else {
         
     }
  }

}
