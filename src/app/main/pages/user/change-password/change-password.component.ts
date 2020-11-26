import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserConfigService } from '@fuse/services/user.config.service';
import { validator, validateAllFormFields, snackBarConfig, snackBarConfigWarn, } from '../../../../../constants/globalFunctions'
import { UserService } from '../user.service';
import * as globalConfig from '../../../../../constants/globalFunctions';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public globalConfig = globalConfig;
  /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     * @param {UserService} _userService
     * @param {MatSnackBar} _snackBar
     */
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _userConfigService: UserConfigService,
    private readonly _userService: UserService,
    private readonly _snackBar: MatSnackBar,
    private readonly _router: Router
  ) { }

  ngOnInit() {
    this.createChangePasswordForm()
  }

  createChangePasswordForm(): void {
    this.changePasswordForm = this._formBuilder.group({
      UserName: [this._userConfigService.loggedInUser.UserName, Validators.required],
      Password: ['', Validators.required],
      NewPassword: ['', [Validators.required, Validators.minLength(globalConfig.validator.minPasswordLength), Validators.pattern(validator.passwordPattern)]],
      ConfirmPassword: ['', Validators.required]
    });
  }
  updatePassword(): void {
    if (this.changePasswordForm.valid) {
        if (this.changePasswordForm.controls['ConfirmPassword'].value != this.changePasswordForm.controls['NewPassword'].value) {
          this.changePasswordForm.controls.ConfirmPassword.setErrors({
            notMatched: true
        });
        return
        }
        this._userService.updatePassword(this.changePasswordForm.value).then((res: any) => {
          if (res && !res.StatusCode) {
            this._snackBar.open('Password updated successfully!', '', snackBarConfig);
            this.logout()
          } else {
            this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn)
          }
        }).catch((err: HttpErrorResponse) => (console.log))
      
    }
  else{
      validateAllFormFields(this.changePasswordForm)
    }
  }
  logout(): void {
    localStorage.clear();
    this._snackBar.open('logout successfully!', '', snackBarConfig);
    this._router.navigate(['/login']);
  }
}
