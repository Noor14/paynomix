import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserConfigService } from '@fuse/services/user.config.service';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as globalConfig from '../../../../../../constants/globalFunctions';
import { snackBarConfig, snackBarConfigWarn } from '../../../../../../constants/globalFunctions';
import { SettingService } from '../../settings.service';

@Component({
    selector: 'app-api-keys',
    templateUrl: './api-keys.component.html',
    styleUrls: ['./api-keys.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class ApiKeysComponent implements OnInit, OnDestroy {

  public globalConfig = globalConfig;
  private _unsubscribeAll: Subject<any>;
  public userImage: any = {};
  /**
  * Constructor
  *
  * @param {SettingService} _settingService
  * @param {UserConfigService} _userConfigService
  * @param {MatSnackBar} _snackBar
  * @param {FormBuilder} _formBuilder
  */

  constructor(
    private readonly _settingService: SettingService,
    private readonly _userConfigService: UserConfigService,
    private readonly _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder

  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {


    // this._userConfigService.userModeChange
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe(() => this.getBasicDetail());

  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
 
}
