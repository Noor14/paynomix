import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserConfigService } from '@fuse/services/user.config.service';
import { TransactionControlsService } from '../../transaction-controls.service';
import * as globalConfig from '../../../../../../../constants/globalFunctions';
@Component({
  selector: 'app-ip-address',
  templateUrl: './ip-address.component.html',
  styleUrls: ['./ip-address.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IpAddressComponent implements OnInit, OnChanges {
  public ipAddressForm: FormGroup;
  @Output() updateList = new EventEmitter<any>();
  @Input() updateIpAddress: any;
  @Input() disableForms: any;
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _snackBar: MatSnackBar,
    private readonly _transactionControlsService: TransactionControlsService,
    private readonly _userConfigService: UserConfigService,
  ) { }


  ngOnInit(): void {
    this.createIpAddressForm()
  }
  ngOnChanges(): void {
    if (this.updateIpAddress) {
      this.updateIpAddress.IsActive = false;
      this.updateIpAddress = [{
        ...this.updateIpAddress
      }]
      this.updateIp(this.updateIpAddress)
    }
    if(this.disableForms) {
      this.ipAddressForm.disable();
    }
  }
  createIpAddressForm(): void {
    this.ipAddressForm = this._formBuilder.group({
      FraudId: [0, Validators.required],
      FraudDescription: ['', Validators.required],
      FraudType: [2, Validators.required],
      IsActive: [true, Validators.required]
    })
  }
  addIpAddress(): any {
    if (this.ipAddressForm.valid) {
      const checkForUserRole = this._userConfigService.getUserMode();
      const roleObject = (checkForUserRole) ? checkForUserRole : { EntityId: 0, UserRoleId: 1 }
      const obj = [{
        ...this.ipAddressForm.value,
        ...roleObject
      }]
      this.ipAddress(obj);
    } else {
      globalConfig.validateAllFormFields(this.ipAddressForm)
    }
  }
  ipAddress(obj?): any {
    this._transactionControlsService.addIpAddress(obj).then((res: any) => {
      if (res && !res.StatusCode) {
        this._snackBar.open('Ip Address has been added successfully!', '', globalConfig.snackBarConfig);
        this.ipAddressForm.reset(this.ipAddressForm.value);
        this.updateList.emit(true);
      } else {
        this._snackBar.open(res.StatusMessage, '', globalConfig.snackBarConfig);
      }
    })
  }
  updateIp(obj?): any {
    this._transactionControlsService.updateIpAddress(obj).then((res: any) => {
      if (res && !res.StatusCode) {
        this._snackBar.open('Ip Address has been deleted successfully!', '', globalConfig.snackBarConfig);
        this.ipAddressForm.reset(this.ipAddressForm.value);
        this.updateList.emit(true);
      } else {
        this._snackBar.open(res.StatusMessage, '', globalConfig.snackBarConfig);
      }
    })
  }
}
