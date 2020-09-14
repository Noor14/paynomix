import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { environment } from '../../../../environments/environment';
import { snackBarConfig, snackBarConfigWarn, validateAllFormFields, validator } from 'constants/globalFunctions';
import { LoginService } from './login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    public appInfo = environment;
    public loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     * @param {LoginService} _loginService
     * @param {LoginService} _formBuilder
     * @param {Router} _router
     * @param {MatSnackBar} _snackBar
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _loginService: LoginService,
        private _router: Router,
        private _snackBar: MatSnackBar
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            Username    : ['', [Validators.required, Validators.email, Validators.pattern(validator.emailPattern)]],
            Password: ['', Validators.required]
        });
    }

    login(): void{
        if(this.loginForm.valid){
            this._loginService.signIn(this.loginForm.value).then((res: any)=>{
                if(res && !res.StatusCode){
                    this._snackBar.open('Signing in', '', snackBarConfig);
                    this._router.navigate(['/pages/dashboard']);
                    localStorage.setItem('userInfo', JSON.stringify(res.Response));
                }else{
                    this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn)
                }
            }).catch((err: HttpErrorResponse)=>(console.log))
        }else{
            validateAllFormFields(this.loginForm)
        }
    }
}
