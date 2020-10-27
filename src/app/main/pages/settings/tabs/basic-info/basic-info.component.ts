import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as globalConfig from '../../../../../../constants/globalFunctions';
import { snackBarConfig } from '../../../../../../constants/globalFunctions';
import { SettingService } from '../../settings.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class BasicInfoComponent implements OnInit, OnDestroy {

  public basicInfoForm: FormGroup;
  public globalConfig = globalConfig;
  private _unsubscribeAll: Subject<any>;
  public  userImage: any = null;
    /**
    * Constructor
    *
    * @param {SettingService} _settingService
    * @param {UserConfigService} _userConfigService
    * @param {MatSnackBar} _snackBar
    * @param {FormBuilder} _formBuilder
    */
   
   constructor(
     private readonly _settingService: SettingService,
     private readonly _userConfigService: UserConfigService,
     private readonly _snackBar: MatSnackBar, 
     private _formBuilder: FormBuilder

 ) { 
      // Set the private defaults
      this._unsubscribeAll = new Subject();
 }

  ngOnInit(): void {
    this.basicInfoForm = this._formBuilder.group({ 
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Address1: ['', Validators.required],
      Address2: [''],
      City: ['', Validators.required],
      State: ['', Validators.required],
      Zip: ['', [Validators.required, Validators.maxLength(globalConfig.validator.zipMaxLength)]],
      Country: ['', Validators.required]
    });
    
    this._userConfigService.userModeChange
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(() => this.getBasicDetail());
   
  }
  
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  getBasicDetail(): void{
    this._settingService.basicInfo(this._userConfigService.getUserMode())
    .then((res: any) => {
        if(res && !res.StatusCode){
          this.basicInfoForm.patchValue(res.Response);
          console.log(res.Response);
        }
    }).catch((err: HttpErrorResponse)=>(console.log))
  } 

  onFileSelect(event): any { 
    this.userImage = event.addedFiles.pop();
  }

 async convertFile(file){
    let reader = new FileReader();
    reader.readAsDataURL(file);
    const fileData = null;
    return reader.onload = () => {
        fileData.FileName = file.name;
        fileData.FileType = file.type;
        fileData.FileValue = (reader as any).result.split(',').pop();
        return fileData
    }
  }


 saveInfo(): void{
    if(this.basicInfoForm.invalid){
      globalConfig.validateAllFormFields(this.basicInfoForm);
    }else{
      const file = (this.userImage)? this.convertFile(this.userImage): null
      const obj = {
        ...this.basicInfoForm.value,
        ...file
      }
      this._settingService.basicInfo(obj)
      .then((res: any) => {
        if(res && !res.StatusCode){
          console.log(res.Response);
          this._snackBar.open('Settings has been saved Successfully!', '', snackBarConfig); 
        }
      }).catch((err: HttpErrorResponse)=>(console.log))
    }
  }
  
  onFileRemove() {
    this.userImage = {}
  }
}
