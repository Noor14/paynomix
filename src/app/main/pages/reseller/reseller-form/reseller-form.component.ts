import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as globalConfig from '../../../../../constants/globalFunctions';
import { PartnerService } from '../../partner/partner.service';
import { SlidingPanelService } from '@fuse/components/sliding-panel/sliding-panel.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reseller-form',
  templateUrl: './reseller-form.component.html',
  styleUrls: ['./reseller-form.component.scss']
})
export class ResellerFormComponent implements OnInit, OnDestroy, OnChanges {

  public resellerForm: FormGroup;
  public globalConfig = globalConfig;
  public partners: any = [];
  @Output() submitForm = new EventEmitter<any>();
  @Input() resellerDetail: any = null;
  private _unsubscribeAll: Subject<any>;
  public userType: any;

    /**
     * Constructor
     *@param {MatDialog} _dialog
     * @param {FormBuilder} _formBuilder
     * @param {UserConfigService} _userConfigService
     * @param {PartnerService} _partnerService
     * @param {SlidingPanelService} _slidingPanelService
     * @param {Router} _router
     */
    constructor(
      private readonly _formBuilder: FormBuilder,
      private readonly _userConfigService: UserConfigService,
      private readonly _partnerService: PartnerService,
      private readonly _slidingPanelService: SlidingPanelService,
      private readonly _dialog: MatDialog,
      private readonly _router: Router

  ) { 
      // Set the private defaults
      this._unsubscribeAll = new Subject();
  }


  ngOnInit(): void {
    this._userConfigService.userModeChange
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(() => this.getPartners())
    this.createResellerForm()
    this.userType =   this._userConfigService.loggedInUser.UserRoleId
   
 }


 ngOnDestroy(): void {
  // Unsubscribe from all subscriptions
  this._unsubscribeAll.next();
  this._unsubscribeAll.complete();
}

createResellerForm(): void {
  this.resellerForm = this._formBuilder.group({
    PartnerId: ['', Validators.required],
    ResellerId: [0, Validators.required],
    ResellerName: [{value:'' , disabled:this.resellerDetail}, [Validators.required ,Validators.maxLength(globalConfig.validator.maxFieldLength)]],
    DBAName: ['', Validators.maxLength(globalConfig.validator.maxFieldLength)],
    Country: ['', Validators.required],
    FirstName: ['',[ Validators.required, Validators.maxLength(globalConfig.validator.maxName)]],
    LastName: ['', [Validators.required, Validators.maxLength(globalConfig.validator.maxName)]],
    Address1: ['', Validators.required],
    City: ['', Validators.required],
    State: ['', Validators.required],
    Zip: ['', [Validators.required, Validators.maxLength(globalConfig.validator.zipMaxLength)]],
    Email: [{value:'', disabled:this.resellerDetail}, [Validators.required, Validators.email, Validators.pattern(globalConfig.validator.emailPattern)]],
    AlternateEmail: ['', [Validators.email, Validators.pattern(globalConfig.validator.emailPattern)]],
    TelephoneNumber: ['', Validators.required],
    TelephoneExt: [''],
    AlternativePhoneNumber: [''],
    AlternativePhoneExt: [''],
    Fax: [''],
    TaxId: [''],
  });

}

ngOnChanges(){
  if(this.resellerDetail){
    if(!this.resellerForm){
      this.createResellerForm()
    }
    this.resellerForm.patchValue(this.resellerDetail)
  }
}

getPartners(): void{
  this._partnerService.partnerList(this._userConfigService.getUserMode())
  .then((res: any) => {
      if(res && !res.StatusCode){
          this.partners = res.Response;
          if(this.userType == 3){
            this.resellerForm.get('PartnerId').patchValue(res.Response[0].PartnerId); 
            this.resellerForm.controls.PartnerId.disable();
        } 
      }
  }).catch((err: HttpErrorResponse)=>(console.log))
  }


  openDialog(): void { 
    
    if(!this.resellerDetail){
    const dialogRef = this._dialog.open(FuseConfirmDialogComponent, {width: '550px'});
    dialogRef.componentInstance.data={
      title: "Confirmation",
      message:"Are you sure you want to close this window?"
    }
    dialogRef.afterClosed().subscribe((result)=>{
    
      if (result){
       this._slidingPanelService.getSidebar('slidePanel', 'ResellerCreateComponent').toggleOpen();
      }
    })
  }
    else{
      this._router.navigate(["/pages/reseller/reseller-list"])
    }
  }


 submit(){
  
   if(this.resellerForm.valid){
     this.submitForm.emit({...this.resellerDetail, ...this.resellerForm.value});
   }else{
    globalConfig.validateAllFormFields(this.resellerForm)
   }
 }


}

