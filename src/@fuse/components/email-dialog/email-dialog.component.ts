import { Component, OnInit , Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validator, validateAllFormFields } from '../../../constants/globalFunctions';
import { snackBarConfig } from 'constants/globalFunctions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingService } from '../../../app/main/pages/settings/settings.service';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.scss']
})
export class EmailDialogComponent implements OnInit {
  @Input() data: any;
 public emailForm : FormGroup;
 public showCC : boolean = false;
 public showBCC : boolean = false;
 public appInfo= environment
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
    private readonly _settingService: SettingService,
    public readonly _dialogRef: MatDialogRef<any>
    ) { }
 
  ngOnInit() {
    this.createEmailForm();
  }
  createEmailForm(): void{
    this.emailForm = this._formBuilder.group({
      SendTo: ['', [Validators.required, Validators.email, Validators.pattern(validator.emailPattern)]], 
      Bcc: ['', [Validators.email, Validators.pattern(validator.emailPattern)]],
      Cc: ['', [Validators.email, Validators.pattern(validator.emailPattern)]],
    });
    if(!this.data.isSingleInput){
      this.emailForm.addControl('PartnerId', this._formBuilder.control('', [Validators.required]))
      this.emailForm.addControl('Subject', this._formBuilder.control('', [Validators.required]))
      this.emailForm.addControl('BodyContent', this._formBuilder.control('', [Validators.required]))
      this.emailForm.addControl('MerchantName', this._formBuilder.control('', [Validators.required]))
    }
    if(this.data) { 
      this.emailForm.patchValue(this.data);
    }
  }

  sendEmail(){
  (this.data.isSingleInput)? 
  this.sendReceiptEmail() :
  this.sendMerchantEmail();
  }

  sendMerchantEmail(){
    if(this.emailForm.valid){ 
      this._settingService.sendEmail(this.emailForm.value)
      .then((res:any) => {
        this._snackBar.open('Email has been sent successfully!', '', snackBarConfig);
        this._dialogRef.close();
      }).catch((err: HttpErrorResponse)=>(console.log));
    }else{
      validateAllFormFields(this.emailForm)
    }
  }

  sendReceiptEmail(){
      if(this.emailForm.valid){
        const obj = {
          TransactionID: this.data.TransactionId,
          MerchantID: this.data.MerchantId,
          To: this.emailForm.value.SendTo,  
          Cc: this.emailForm.value.Cc,  
          Bcc: this.emailForm.value.Bcc,  
          TemplateTypeID: 1
        }
        this._settingService.sendReceipt(obj)
        .then((res:any) => {
          this._snackBar.open(res.StatusMessage, '', snackBarConfig);
          this._dialogRef.close();
        }).catch((err: HttpErrorResponse)=>(console.log));
      }else{
        validateAllFormFields(this.emailForm)
      }
  }

}
