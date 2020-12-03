import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayLockComponent } from './overlay-lock.component';



@NgModule({
  declarations: [OverlayLockComponent],
  exports: [OverlayLockComponent],
  imports: [
    CommonModule
  ]
})
export class OverlayLockModule { }
