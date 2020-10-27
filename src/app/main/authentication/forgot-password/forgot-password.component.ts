import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { environment } from 'environments/environment';

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
     */
    constructor(
        private _formBuilder: FormBuilder
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
            email: ['', [Validators.required, Validators.email]]
        });
    }

    // resetPassword(): void{
    //     if (this.resetPasswordForm.invalid){
    //         return;
    //     }
    //     else {
    //         this._loginService.resetPassword(this.resetPasswordForm.value).then((res: any) => {
    //             if (!res.StatusCode) {
    //             this._router.navigate(['/login']);
    //             this._snacksBar.open('An email has been sent. Follow the directions in email to reset your password', '', {
    //               duration: 4000,
    //               verticalPosition: 'top',
    //               horizontalPosition: 'end',
    //               panelClass: ['white-snackbar']
    //             });
    //            } else {
    //             //  here we display toasters error
    //             this._snacksBar.open('The email address does not exist in our system', '', {
    //               duration: 3000,
    //               verticalPosition: 'top',
    //               horizontalPosition: 'end',
    //               panelClass: ['alert-snackbar']
      
    //             });
    //            } 
    //           });
    //     }
    // }
}
