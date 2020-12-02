import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as globalConfig from '../../../../../constants/globalFunctions';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SlidingPanelService } from '@fuse/components/sliding-panel/sliding-panel.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-partner-form',
  templateUrl: './partner-form.component.html',
  styleUrls: ['./partner-form.component.scss']
})
export class PartnerFormComponent implements OnInit, OnChanges {
  public partnerForm: FormGroup;
  @Output() submitForm = new EventEmitter<any>();
  @Input() partnerDetail: any = null;
  public globalConfig = globalConfig;

      /**
     * Constructor
     * @param {Router} _router
     *@param {MatDialog} _dialog
     * @param {FormBuilder} _formBuilder,
     * @param {SlidingPanelService} _slidingPanelService
     */
    constructor(
      private readonly _dialog: MatDialog,
      private readonly _formBuilder: FormBuilder,
      private readonly _slidingPanelService: SlidingPanelService,
      private readonly _router: Router
  ) {}


ngOnInit(): void{

  this.createPartnerForm();
}

ngOnChanges(){
  
  if(this.partnerDetail){
    if(!this.partnerForm){
      this.createPartnerForm()
    }
    this.partnerForm.patchValue(this.partnerDetail)
  }
}


createPartnerForm(): void{
 
  this.partnerForm = this._formBuilder.group({
    PartnerId: [0, Validators.required],
    PartnerName: [{value: '', disabled: this.partnerDetail},[ Validators.required ,Validators.maxLength(globalConfig.validator.maxFieldLength)]], 
    DBAName: ['' , Validators.maxLength(globalConfig.validator.maxFieldLength)],
    FirstName: ['', [Validators.required,Validators.maxLength(globalConfig.validator.maxName)]],
    LastName: ['', [Validators.required , Validators.maxLength(globalConfig.validator.maxName)]],
    Country:  [''],
    Address1: ['', Validators.required],
    City: ['', Validators.required],
    State: [''],
    Zip: ['', [Validators.required, Validators.maxLength(globalConfig.validator.zipMaxLength)]],
    Email:  [{value: '', disabled: this.partnerDetail}, [Validators.required, Validators.email, Validators.pattern(globalConfig.validator.emailPattern)]],
    WebsiteUrl: ['', Validators.required],
    Phone: ['', Validators.required],
    AlternatePhone: [''],
    TaxId: [''],
    ExchangeRateMarkup: ['', [Validators.required ,Validators.max(globalConfig.validator.maxPercentage)]],
    DefaultSettlementCurrency: ['', Validators.required]
});

}

openDialog(): void {

if(!this.partnerDetail){
  const dialogRef = this._dialog.open(FuseConfirmDialogComponent, {width: '550px'});
  
  dialogRef.componentInstance.data={
    title: "Confirmation",
    message:"Are you sure you want to close this window?"
  }
  dialogRef.afterClosed().subscribe((result)=>{
    if (result){
     this._slidingPanelService.getSidebar('slidePanel', 'PartnerCreateComponent').toggleOpen();
    }
  })
}
else{
  this._router.navigate(["/pages/partner/partner-list"])
}

}



submit(){
  
   if(this.partnerForm.valid){
     
     this.submitForm.emit({...this.partnerDetail, ...this.partnerForm.value});
   }else{
    globalConfig.validateAllFormFields(this.partnerForm)
   }
 }

}
