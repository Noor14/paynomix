import { Component, OnInit , Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validator, validateAllFormFields } from '../../../constants/globalFunctions';
import { snackBarConfig } from 'constants/globalFunctions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingService } from '../../../app/main/pages/settings/settings.service';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { MatChipInputEvent } from '@angular/material';
import {ENTER, COMMA,SPACE} from '@angular/cdk/keycodes';


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
 public SingleEmail : any;

 visible: boolean = true;
 selectable: boolean = true;
 removable: boolean = true;
 addOnBlur: boolean = true;

 separatorKeysCodes = [ENTER, COMMA,SPACE];


 emailObj =  {
 SendTo: [], 
 Bcc: [],
 Cc: []
}


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
        PartnerId: ['', Validators.required],
        SendTo: ['', [Validators.required, Validators.email, Validators.pattern(validator.emailPattern)]], 
        Bcc: [''],
        Cc: [''],
        Subject: ['', Validators.required],
        HtmlBodyContent: ['', Validators.required],
        MerchantName: ['', Validators.required],
    });
    if(this.data) { 
   //   this.emailForm.patchValue(this.data);
      this.emailForm.value.PartnerId = this.data.PartnerId
      this.emailForm.value.Subject = this.data.Subject
      this.emailForm.value.HtmlBodyContent = this.data.HtmlBodyContent
      this.emailForm.value.MerchantName = this.data.MerchantName
      this.emailObj.SendTo.push({email : this.data.SendTo});
 
    }
    
  }
  
  sendEmail(){
    const obj = {...this.emailForm.value, ...this.emailObj};
     console.log(obj)
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




  add(event: MatChipInputEvent,val?): void {
    const input = event.input;
    const value = event.value;
    switch(val){
    // to email
    case 1:
    if ((value || '').trim()) {
      this.emailObj.SendTo.push({email: value.trim()});
    }
    break;
    case 2:
      if ((value || '').trim()) {
        this.emailObj.Cc.push({email: value.trim()});
      }
    break;

    case 3:
      if ((value || '').trim()) {
        this.emailObj.Bcc.push({email: value.trim()});
      }
    break;

  }

    // Reset the input value
    if (input) {
      input.value = '';
    }

  }



  remove(x,val?): void {

switch(val){
    case 1:
    const indexto = this.emailObj.SendTo.indexOf(x);
    if (indexto >= 0) {
      this.emailObj.SendTo.splice(indexto, 1);
    }
    break;
    case 2:
        const indexcc = this.emailObj.Cc.indexOf(x);
        if (indexcc >= 0) {
          this.emailObj.Cc.splice(indexcc, 1);
        }
        break;
        case 3 :
            const indexbcc = this.emailObj.Bcc.indexOf(x);
            if (indexbcc >= 0) {
              this.emailObj.Bcc.splice(indexbcc, 1);
            }
            break;

}


  }
}



