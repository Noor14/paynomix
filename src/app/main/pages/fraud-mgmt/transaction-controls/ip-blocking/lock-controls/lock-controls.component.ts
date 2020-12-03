import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserConfigService } from '@fuse/services/user.config.service';
import { TransactionControlsService } from '../../transaction-controls.service';
import * as globalConfig from '../../../../../../../constants/globalFunctions';

@Component({
  selector: 'app-lock-controls',
  templateUrl: './lock-controls.component.html',
  styleUrls: ['./lock-controls.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LockControlsComponent implements OnInit {
  public lockControlForm: FormGroup;
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _userConfigService: UserConfigService,
    private readonly _transactionControlsService: TransactionControlsService,
    private readonly _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.createLockControlForm();
  }
  createLockControlForm(): void {
    this.lockControlForm = this._formBuilder.group({
      IsActive: ['', Validators.required],
      FraudType: [2, Validators.required],
    })
  }
  lockSettings(): any {
    if (this.lockControlForm.valid) {
      const checkForUserRole = this._userConfigService.getUserMode();
      const roleObject = (checkForUserRole) ? checkForUserRole : { EntityId: 0, UserRoleId: 1 }
      const obj = {
        ...this.lockControlForm.value,
        ...roleObject
      }
    this._transactionControlsService.lockControls(obj).then((res:any)=>{
      if (res && !res.StatusCode) { 
        this._snackBar.open('Settings have been saved successfully', '', globalConfig.snackBarConfig);
        this.lockControlForm.reset();
      }
    })
    } else  {

    }
  }
}
