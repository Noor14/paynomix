import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LockControlsComponent } from './lock-controls.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations:[
    LockControlsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    FlexLayoutModule
  ],
  exports: [LockControlsComponent]
})
export class lockControlsModule { }
