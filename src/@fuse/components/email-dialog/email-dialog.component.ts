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
public  reciptForm: FormGroup;
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
console.log(this.data)
if(this.data.isSingleInput == true){
    this.createReciptForm();
}else{
    this.createEmailForm();
}

 
  }
  createEmailForm(): void{
    this.emailForm = this._formBuilder.group({
        PartnerId: ['', Validators.required],
        SendTo: ['', [Validators.required, Validators.email, Validators.pattern(validator.emailPattern)]], 
        Bcc: ['', [Validators.email, Validators.pattern(validator.emailPattern)]],
        Cc: ['', [Validators.email, Validators.pattern(validator.emailPattern)]],
        Subject: ['', Validators.required],
        BodyContent: ['', Validators.required],
        MerchantName: ['', Validators.required],
    });
    if(this.data) { 
      this.emailForm.patchValue(this.data);
    }
  }

  createReciptForm(): void{
    this.reciptForm = this._formBuilder.group({
        To: ['', [Validators.email, Validators.pattern(validator.emailPattern)]],
        Cc:[''],
        Bcc: ['']
    });
   
  }

  
  sendEmail(){
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
  sendreciptEmail(){
      const obj = {
        "TransactionID": this.data.TransactionId,
        "MerchantID": this.data.MerchantId,
        "To": this.reciptForm.value.To,  
        "Cc": this.reciptForm.value.Cc,  
        "Bcc": this.reciptForm.value.Bcc,  
        "TemplateTypeID": "1"
      }
      if(this.reciptForm.valid){ 
        this._settingService.sendRecipt(obj)
        .then((res:any) => {
          this._snackBar.open(res.StatusMessage, '', snackBarConfig);
          this._dialogRef.close();
        }).catch((err: HttpErrorResponse)=>(console.log));
      }else{
        validateAllFormFields(this.emailForm)
      }


  }

}
