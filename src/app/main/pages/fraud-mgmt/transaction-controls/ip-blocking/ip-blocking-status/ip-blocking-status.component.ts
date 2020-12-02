import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserConfigService } from '@fuse/services/user.config.service';
import { TransactionControlsService } from '../../transaction-controls.service';
import * as globalConfig from '../../../../../../../constants/globalFunctions';

@Component({
  selector: 'app-ip-blocking-status',
  templateUrl: './ip-blocking-status.component.html',
  styleUrls: ['./ip-blocking-status.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IpBlockingStatusComponent implements OnInit {
  public ipBlockingStatusForm: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _userConfigService: UserConfigService,
    private readonly _transactionControlsService: TransactionControlsService,
    private readonly _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.createIpBlockingForm();
  }
  createIpBlockingForm(): void {
    this.ipBlockingStatusForm = this._formBuilder.group({
      Status: ['', Validators.required],
      FraudType: [2, Validators.required],
    })
  }
  ipBlockingStatus(): any {
     if(this.ipBlockingStatusForm.valid) {
      const checkForUserRole = this._userConfigService.getUserMode();
      const roleObject = (checkForUserRole) ? checkForUserRole : { EntityId: 0, UserRoleId: 1 }
      const obj = {
        ...this.ipBlockingStatusForm.value,
        ...roleObject
      }
      this._transactionControlsService.ipBlockingStatus(obj).then((res:any)=>{
        if (res && !res.StatusCode) { 
          this._snackBar.open('Ip Blocking status set Successfully!', '', globalConfig.snackBarConfig);
          this.ipBlockingStatusForm.reset();
        }
      })
     } else {
         
     }
  }
}
