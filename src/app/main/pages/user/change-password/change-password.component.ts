import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserConfigService } from '@fuse/services/user.config.service';
import { validator,validateAllFormFields, snackBarConfig } from '../../../../../constants/globalFunctions'
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public passwordMisMatchError: boolean;

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
    private readonly _snackBar: MatSnackBar
   ) { }

  ngOnInit() {
    this.createChangePasswordForm()
  }

  createChangePasswordForm(): void {
    this.changePasswordForm = this._formBuilder.group({
      UserName: [this._userConfigService.loggedInUser.UserName, Validators.required],
      Password: ['', Validators.required],
      NewPassword: ['', [Validators.required, Validators.pattern(validator.passwordPattern)]],
      ConfirmPassword: ['', [Validators.required, Validators.pattern(validator.passwordPattern)]]
    });
  }
  updatePassword():void {
    if(this.changePasswordForm.valid) {
      this._userService.updatePassword(this.changePasswordForm.value).then((res: any)=> {
       if(res && !res.StatusCode) {
        this._snackBar.open('Password updated successfully!', '', snackBarConfig);
       }
      }).catch((err: HttpErrorResponse)=>(console.log))
    } else {
      validateAllFormFields(this.changePasswordForm)
    }
  }
}
