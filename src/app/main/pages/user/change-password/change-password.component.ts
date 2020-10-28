import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  
  /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
  constructor( private readonly _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createChangePasswordForm()
  }

 createChangePasswordForm(): void{
    this.changePasswordForm = this._formBuilder.group({
      OldPassword: ['', Validators.required],
      NewPassword: ['', Validators.required],
      ConfirmPassword: ['', Validators.required]
  });
  }
}
