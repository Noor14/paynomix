import { Component, OnInit , Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MerchantService } from 'app/main/pages/merchant/merchant.service';
import { validator } from '../../../constants/globalFunctions';
import { snackBarConfig } from 'constants/globalFunctions';

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
     */
  constructor(private readonly _formBuilder: FormBuilder,  private readonly _snackBar: MatSnackBar, private _merchantService: MerchantService) { }
 
  ngOnInit() {
    this.createEmailForm();
  }
  createEmailForm(): void{
    this.emailForm = this._formBuilder.group({
        PartnerId: [''],
        SendTo: ['', [Validators.email, Validators.pattern(validator.emailPattern)]], 
        SendFrom: [''],
        Bcc: [''],
        Cc: [''],
        Subject: [''],
        HtmlBodyContent: [''],
        BodyContent: [''], 
        MerchantName: [''],
    });
    if(this.data) { 
      this.emailForm.patchValue(this.data);
    }
  }
  
  submit(){
    if(this.emailForm.valid){ 
      this._merchantService.sendEmail(this.emailForm.value).then((res:any) => {
        this._snackBar.open('Email has been Sent Successfully!', '', snackBarConfig);
      })
    }
  }
}
