import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { environment } from 'environments/environment';
import { snackBarConfig, snackBarConfigWarn, validateAllFormFields, validator } from '../../../../constants/globalFunctions';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
    selector     : 'forgot-password',
    templateUrl  : './forgot-password.component.html',
    styleUrls    : ['./forgot-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ForgotPasswordComponent implements OnInit
{
    public forgotPasswordForm: FormGroup;
    public appInfo = environment;


    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     * @param {AuthenticationService} _authenticationService
     */
    constructor(
        private _formBuilder: FormBuilder,
        private readonly _router: Router,
        private readonly _authenticationService: AuthenticationService,
        private _snacksBar: MatSnackBar
    )
    {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email, Validators.pattern(validator.emailPattern)]]
        });
    }


    resetPassword(): void{
        if (this.forgotPasswordForm.invalid){
            validateAllFormFields(this.forgotPasswordForm);
        }
        else {
            this._authenticationService.resetPassword(this.forgotPasswordForm.value)
            .then((res: any) => {
                if (res && !res.StatusCode) {
                this._router.navigate(['login']);
                this._snacksBar.open('An email has been sent. Follow the directions in email to reset your password', '', snackBarConfig);
               } else {
                this._snacksBar.open('The email address does not exist in our system', '', snackBarConfigWarn);
               } 
              }).catch((err: HttpErrorResponse)=>(console.log));
        }
    }




}
