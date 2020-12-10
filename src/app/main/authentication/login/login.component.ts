import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { environment } from '../../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validator, snackBarConfiglogin, snackBarConfigWarn, validateAllFormFields } from '../../../../constants/globalFunctions';
import { AuthenticationService } from '../authentication.service';

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
    public loggedIn: boolean = false;
    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     * @param {AuthenticationService} _authenticationService
     * @param {Router} _router
     * @param {MatSnackBar} _snackBar
     */
    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _authenticationService: AuthenticationService,
        private readonly _router: Router,
        private readonly _snackBar: MatSnackBar
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
            Username: ['', [Validators.required, Validators.email, Validators.pattern(validator.emailPattern)]],
            Password: ['', Validators.required]
        });
    
    }

    login(): void{
        this.loggedIn = true;
        if(this.loginForm.valid){
            this._snackBar.open('Signing in', '', snackBarConfiglogin);
            this._authenticationService.signIn(this.loginForm.value).then((res: any)=>{
                if(res && !res.StatusCode){
                    if(res.Response.IsActive){
                        localStorage.setItem('userInfo', JSON.stringify(res.Response));
                        this._router.navigate(['/pages/dashboard']);
                    }else{
                        this._router.navigate(['inActive']);
                    }
                  
                }else{
                    this.loggedIn = false;
                    this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn);
                }
            }).catch((err: HttpErrorResponse)=>(console.log))
        }else{
            validateAllFormFields(this.loginForm)
            this.loggedIn = false;
        }
    }
}
