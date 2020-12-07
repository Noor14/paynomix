import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FuseSharedModule } from '@fuse/shared.module';
import { CountryStatusComponent } from './country-status.component';


@NgModule({
  declarations: [
      CountryStatusComponent
  ],
  imports: [
    CommonModule,
    MatRadioModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule ,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    FuseSharedModule,
    MatRadioModule,
  ],
  exports:[
    CountryStatusComponent
  ]
})
export class CountryStatusModule { }
