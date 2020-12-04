import { Component, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserConfigService } from '@fuse/services/user.config.service';
import * as globalConfig from '../../../../../../constants/globalFunctions';
import { TransactionControlsService } from '../../transaction-controls/transaction-controls.service';

@Component({
  selector: 'app-lock-controls',
  templateUrl: './lock-controls.component.html',
  styleUrls: ['./lock-controls.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LockControlsComponent implements OnInit, OnChanges {
  public lockControlForm: FormGroup;
  @Input() lockingDetails:any
  @Input() fraudTypeLock :any
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _userConfigService: UserConfigService,
    private readonly _transactionControlsService: TransactionControlsService,
    private readonly _snackBar: MatSnackBar,
  ) { } 
  ngOnInit(): void {
    this.createLockControlForm();
  }
  ngOnChanges(): void {
    if(this.lockingDetails) {
      this.lockControlForm.patchValue(this.lockingDetails);
    }
    if(this.fraudTypeLock) {
      console.log(this.fraudTypeLock);
      this.lockControlForm.value.FraudTypeId = this.fraudTypeLock;
      this.lockControlForm.controls['FraudTypeId'].setValue(this.fraudTypeLock);
    }
  }
  createLockControlForm(): void {
    this.lockControlForm = this._formBuilder.group({
      IsActive: [false, Validators.required],
      FraudTypeId: [this.fraudTypeLock, Validators.required],
    })
  }
  lockSettings(): any {
    if (this.lockControlForm.valid) {
      const UserRole = this._userConfigService.getUserMode();
      const obj = {
        ...this.lockControlForm.value,
        ...UserRole
      }
    this._transactionControlsService.lockControls(obj).then((res:any)=>{
      if (res && !res.StatusCode) { 
        this._snackBar.open('Settings have been saved successfully', '', globalConfig.snackBarConfig);
        this.lockControlForm.controls['IsActive'].reset();
      }
    })
    } else  {

    }
  }
}
