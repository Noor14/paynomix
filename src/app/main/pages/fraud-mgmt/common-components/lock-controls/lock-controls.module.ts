import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LockControlsComponent } from './lock-controls.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations:[
    LockControlsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule
  ],
  exports: [LockControlsComponent]
})
export class lockControlsModule { }
