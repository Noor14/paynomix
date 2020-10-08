import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SettingsComponent } from './settings.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { BasicInfoComponent } from './tabs/basic-info/basic-info.component';
import { GeneralSettingComponent } from './tabs/general-setting/general-setting.component';
import { MakeSaleSettingComponent } from './tabs/general-setting/general-tabs/make-sale-setting/make-sale-setting.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  declarations: [SettingsComponent, BasicInfoComponent, GeneralSettingComponent, MakeSaleSettingComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatButtonModule,
    FuseSharedModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxDropzoneModule,
    MatExpansionModule,
    MatCheckboxModule
  ]
})
export class SettingsModule { }
