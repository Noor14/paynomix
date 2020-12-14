import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserConfigService } from '@fuse/services/user.config.service';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as globalConfig from '../../../../../../constants/globalFunctions';
import { snackBarConfig, snackBarConfigWarn } from '../../../../../../constants/globalFunctions';
import { SettingService } from '../../settings.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class BasicInfoComponent implements OnInit, OnDestroy {

  private settingDetail: any = {}
  public basicInfoForm: FormGroup;
  public globalConfig = globalConfig;
  private _unsubscribeAll: Subject<any>;
  public userImage: any = {};
    CurrentUser: any;
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
    this.basicInfoForm = this._formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: [''],
      PhoneNo : [''],
      City: ['', Validators.required],
      Address1: ['', Validators.required],
      State: ['', Validators.required],
      Zip: ['', [Validators.required, Validators.maxLength(globalConfig.validator.zipMaxLength)]],
      Country: ['', Validators.required]
    });
    this.CurrentUser = this._userConfigService.loggedInUser.UserRoleId


    this._userConfigService.userModeChange
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => this.getBasicDetail());

  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  getBasicDetail(): void {
    this._settingService.basicInfo(this._userConfigService.getUserMode())
      .then((res: any) => {
        if (res && !res.StatusCode) {
          this.settingDetail = res.Response;
          this.basicInfoForm.patchValue(this.settingDetail);
          if (this.settingDetail.FilePath)
            this.userImage.FilePath = `${environment.apiURL.split('api/').shift()}${this.settingDetail.FilePath}`;
        }
      }).catch((err: HttpErrorResponse) => (console.log))
  }

  onFileSelect(event): any {
    if (event.rejectedFiles.length) {
      let rejectedFile = event.rejectedFiles.pop();
      if (rejectedFile.reason == 'size') {
        this._snackBar.open('This file exceeds the maximum size limit of 5MB', '', snackBarConfigWarn);
        return;
      }
      else if (rejectedFile.reason == 'type') {
        this._snackBar.open('Only files with the following extensions are allowed: png jpg jpeg', '', snackBarConfigWarn);
        return;
      }
    } else {
      this.userImage = event.addedFiles.pop();
      this.convertFile(this.userImage)
    }
  }

  async convertFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.userImage.FileName = file.name;
      this.userImage.FileType = file.type;
      this.userImage.FileExtension = file.type;
      this.userImage.FileValue = (reader as any).result.split(',').pop();
    }
  }


  saveInfo(): void {
    if (this.basicInfoForm.invalid) {
      globalConfig.validateAllFormFields(this.basicInfoForm);
    } else {
      const obj = {
        ...this.settingDetail,
        ...this.basicInfoForm.value,
        ...this.userImage
      }
      this._settingService.saveBasicInfo(obj)
        .then((res: any) => {
          if (res && !res.StatusCode) {
            this._snackBar.open('Settings has been saved Successfully!', '', snackBarConfig);
          } else {
            this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn);
          }
        }).catch((err: HttpErrorResponse) => (console.log))
    }
  }

  onFileRemove() {
    this.userImage = {};
  }
}
