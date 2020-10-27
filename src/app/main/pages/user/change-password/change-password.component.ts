import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public passwordForm: FormGroup;
  private _formBuilder: any;

  constructor() { }

  ngOnInit() {
    // this.passwordForm = this._formBuilder.group({
    //   OldPassword: ['', Validators.required],
    //   NewPassword: ['', Validators.required],
    //   ConfirmPassword: ['', Validators.required]
     
    // });
  }

}
