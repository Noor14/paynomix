import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { environment } from '../../../../environments/environment';
import { validateAllFormFields, validator } from 'constants/globalFunctions';

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
     */
    constructor(
        private _formBuilder: FormBuilder
    )
    {
        // Configure the layout
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

        }else{
            validateAllFormFields(this.loginForm)
        }
    }
}
