import { Component, OnInit,Input,Output } from '@angular/core';
import { UserConfigService } from '@fuse/services/user.config.service';
import { TransactionDataControlsService } from '../transaction-data-controls.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig,snackBarConfigWarn,validateAllFormFields } from 'constants/globalFunctions';
import { FraudMgmtService } from '../../fraud-mgmt.service';
import { OverlayLockService } from '@fuse/components/overlay-lock/overlay-lock.service';
import * as globalConfig from '../../../../../../constants/globalFunctions';

@Component({
  selector: 'app-large-trans-notification',
  templateUrl: './large-trans-notification.component.html',
  styleUrls: ['./large-trans-notification.component.scss']
})
export class LargeTransNotificationComponent implements OnInit {
  public largeTransactionForm: FormGroup;

  @Input() fraudType : any;
  public disableForms: any;
    lockingDetails: any;
    fraudTypeLock: any;
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _transactionDataControlsService: TransactionDataControlsService,
    private readonly _userConfigService: UserConfigService,
    private readonly _fraudManagementService: FraudMgmtService,
    private readonly _overlayLockService : OverlayLockService,
    private readonly _snackBar: MatSnackBar,
    
  ) { }

  ngOnInit(): void {
    this.createlargeTransactionForm()
    this.searchLargeTransaction();
  
  }

  searchLargeTransaction(){

    const checkForUserRole = this._userConfigService.getUserMode();
    const roleObject = (checkForUserRole) ? checkForUserRole : { EntityId: 0, UserRoleId: 1 }
    const obj = {
      ...roleObject
    }
    
    this._transactionDataControlsService.searchLargeTransaction(obj).then((res: any) => {
      if (res && !res.StatusCode) {
     
        this.largeTransactionForm.patchValue(res.Response);
      } else {
        this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn);
      }
    })


  }





  ngOnChanges(): void {
    if(this.disableForms) {
      this.largeTransactionForm.disable();
    }
  }

  createlargeTransactionForm(): void {
    this.largeTransactionForm = this._formBuilder.group({
      TransactionAmount: [0, Validators.required],
      Email: ['', [Validators.required, Validators.email, Validators.pattern(globalConfig.validator.emailPattern)]],
      Status: [true, Validators.required]
    })
  }

  addlargeNotification(): any {
    if (this.largeTransactionForm.valid) {
      const checkForUserRole = this._userConfigService.getUserMode();
      const roleObject = (checkForUserRole) ? checkForUserRole : { EntityId: 0, UserRoleId: 1 }
      const obj = {
        ...this.largeTransactionForm.value,
        ...roleObject
      }
      
      this._transactionDataControlsService.addNotification(obj).then((res: any) => {
        if (res && !res.StatusCode) {
          this._snackBar.open(res.StatusMessage, '', snackBarConfig);
          this.largeTransactionForm.reset(this.largeTransactionForm.value);
        } else {
          this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn);
        }
      })

    } else {
      validateAllFormFields(this.largeTransactionForm)
    }
  }

}
