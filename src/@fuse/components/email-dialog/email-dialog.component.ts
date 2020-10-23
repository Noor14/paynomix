import { Component, OnInit , Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
     */
  constructor(private readonly _formBuilder: FormBuilder) { }
 
  ngOnInit() {
    this.createEmailForm();
  }
  createEmailForm(): void{
    this.emailForm = this._formBuilder.group({
        PartnerId: [''],
        SendTo: [''], 
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
    }
  }
}
