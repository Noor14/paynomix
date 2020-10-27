import { Component, OnInit , Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validator, validateAllFormFields } from '../../../constants/globalFunctions';
import { snackBarConfig } from 'constants/globalFunctions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingService } from '../../../app/main/pages/settings/settings.service';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.scss']
})
export class EmailDialogComponent implements OnInit {
  @Input() data: any;
 public emailForm : FormGroup;

   /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
      * @param {MatSnackBar} _snackBar
      * @param {SettingService} _settingService
     */
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _snackBar: MatSnackBar, 
    private _settingService: SettingService,
    private dialogRef: MatDialogRef<any>
    ) { }
 
  ngOnInit() {
    this.createEmailForm();
  }
  createEmailForm(): void{
    this.emailForm = this._formBuilder.group({
        PartnerId: ['', Validators.required],
        SendTo: ['', [Validators.required, Validators.email, Validators.pattern(validator.emailPattern)]], 
        Bcc: [''],
        Cc: [''],
        Subject: ['', Validators.required],
        HtmlBodyContent: ['', Validators.required],
        MerchantName: ['', Validators.required],
    });
    if(this.data) { 
      this.emailForm.patchValue(this.data);
    }
  }
  
  sendEmail(){
    if(this.emailForm.valid){ 
      this._settingService.sendEmail(this.emailForm.value)
      .then((res:any) => {
        this._snackBar.open('Email has been sent Successfully!', '', snackBarConfig);
        this.dialogRef.close();
      }).catch((err: HttpErrorResponse)=>(console.log));
    }else{
      validateAllFormFields(this.emailForm)
    }
  }
}
