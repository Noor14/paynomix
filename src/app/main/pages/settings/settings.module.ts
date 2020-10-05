import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SettingsComponent } from './settings.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { BottomSheetModule } from '@fuse/components';
import { ImageUploaderModule } from 'ngx-image-uploader';
@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatButtonModule,
    FuseSharedModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    BottomSheetModule,
    ImageUploaderModule
  ]
})
export class SettingsModule { }
