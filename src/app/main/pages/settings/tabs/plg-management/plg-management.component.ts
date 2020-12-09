import { HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoFoundComponent } from '@fuse/components/no-found/no-found.component';
import { UserConfigService } from '@fuse/services/user.config.service';
import { PartnerService } from 'app/main/pages/partner/partner.service';
import { snackBarConfig, snackBarConfigWarn } from 'constants/globalFunctions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlgTableComponent } from './plg-table/plg-table.component';
import * as globalConfig from '../../../../../../constants/globalFunctions';
import { SettingService } from '../../settings.service';

@Component({
  selector: 'app-plg-management',
  templateUrl: './plg-management.component.html',
  styleUrls: ['./plg-management.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlgManagementComponent implements OnInit {
  public plgManagmentForm: FormGroup;
  @ViewChild('renderingContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  public partners: any[] = [];
  public plg: any[] = [];
  private _unsubscribeAll: Subject<any>;
  public logoImage: any = {};
  public splashScreenImage: any = {};
  /**
   * Constructor
   *
   * @param {FormBuilder} _formBuilder
   * @param {PartnerService} _partnerService
    * @param {UserConfigService} _userConfigService
    * @param {ComponentFactoryResolver} _resolver
   */
  constructor(private readonly _partnerService: PartnerService,
    private readonly _userConfigService: UserConfigService,
    private readonly _resolver: ComponentFactoryResolver,
    private readonly _formBuilder: FormBuilder,
    private readonly _snackBar: MatSnackBar,
    private readonly _settingService: SettingService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._userConfigService.userModeChange
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => this.getPlg()
      )
    this.getPartners()
    this.createPlgManagementForm();
  }
  renderingComponent(type, data?) {
    const factory: ComponentFactory<any> = this._resolver.resolveComponentFactory(type);
    this.container.clear();
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.data = data;
  }

  createPlgManagementForm(): void {
    this.plgManagmentForm = this._formBuilder.group({
      DomainName: ['', Validators.required],
      colorTheme: ['', Validators.required],
      customScrollbars: [true, Validators.required],
      PartnerID: ['', Validators.required],
      layout: this._formBuilder.group({
        style: [''],
        width: [''],
        navbar: this._formBuilder.group({
          primaryBackground: [''],
          secondaryBackground: [''],
          folded: [false, Validators.required],
          hidden: [false,  Validators.required],
          position: [''],
          variant: ['']
        }),
        toolbar: this._formBuilder.group({
          background: [''],
          customBackgroundColor: [true, Validators.required],
          hidden: [false, Validators.required],
          position: ['']
        }),
        footer: this._formBuilder.group({
          background: [''],
          customBackgroundColor: [false, Validators.required],
          hidden: [true, Validators.required],
          position: ['']
        }),
        sidepanel: this._formBuilder.group({
          hidden: [true, Validators.required],
          position: ['']
        })
      })
    })
  }
  onFileSelect(event, value): any {
    if (event.rejectedFiles.length) {
      let rejectedFile = event.rejectedFiles.pop();
      if (rejectedFile.reason == 'size') {
        this._snackBar.open('This file exceeds the maximum size limit of 5MB', '', snackBarConfigWarn);
        return;
      }
      else if (rejectedFile.reason == 'type') {
        this._snackBar.open('Only files with the following extensions are allowed: png jpg jpeg', '', snackBarConfigWarn);
        return;
      }
    } else {
      if (value == 'logoImage') {
        this.logoImage = event.addedFiles.pop();
        this.convertFile(this.logoImage, value)
      } else if (value == 'splashScreenImage') {
        this.splashScreenImage = event.addedFiles.pop();
        this.convertFile(this.splashScreenImage, value)
      }
    }
  }
  async convertFile(file, value?) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (value == 'logoImage') {
        this.logoImage.filename = file.name;
        this.logoImage.filetype = file.type;
        this.logoImage.fileextension = file.type;
        this.logoImage.value = (reader as any).result.split(',').pop();
      } else if (value == 'splashScreenImage') {
        this.splashScreenImage.filename = file.name;
        this.splashScreenImage.filetype = file.type;
        this.splashScreenImage.fileextension = file.type;
        this.splashScreenImage.value = (reader as any).result.split(',').pop();
      }

    }
  }
  getPartners(): void {
    this._partnerService.partnerList(this._userConfigService.getUserMode())
      .then((res: any) => {
        if (res && !res.StatusCode) {
          if (res.Response && res.Response.length) {
            this.partners = res.Response;
            this.renderingComponent(PlgTableComponent, {
              partners: this.partners,
            })
          } else {
            this.renderingComponent(NoFoundComponent, {
              icon: 'no-pricing-plan',
              text: 'No partner found',
              subText: "You Haven't made any Partner yet"
            });
          }
        }
      }).catch((err: HttpErrorResponse) => (console.log))
  }
  getPlg(): void {
    this._settingService.getPlgManager(this._userConfigService.getUserMode())
      .then((res: any) => {
        if (res && !res.StatusCode) {
          if (res.Response && res.Response.length) {
            this.plg = res.Response;
            this.renderingComponent(PlgTableComponent, {
              partners: this.plg,
            })
          } else {
            this.renderingComponent(NoFoundComponent, {
              icon: 'no-pricing-plan',
              text: 'No partner found',
              subText: "You Haven't made any Partner yet"
            });
          }
        }
      }).catch((err: HttpErrorResponse) => (console.log))
  }
  onFileRemove(value) {
    if (value == 'splashScreenImage') {
      this.splashScreenImage = {};
    } else if (value == "logoImage") {
      this.logoImage = {};
    }
  }
  saveLayouts() {
    if (this.plgManagmentForm.valid) {
      const obj = {
        logoImage: {...this.logoImage},
        splashScreenImage: {...this.splashScreenImage},
        ...this.plgManagmentForm.value,
      }
      this._settingService.plgManager(obj).then((res: any) => {
       if(res && !res.StatusCode) {
        this._snackBar.open('Theme settings have been saved successfully!', '', snackBarConfig);
       } else {
        this._snackBar.open(res.StatusMessage, '', snackBarConfigWarn);
       }
      })
    } else {
      globalConfig.validateAllFormFields(this.plgManagmentForm);
    }
  }
}
