import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { OverlayLockComponent } from './overlay-lock.component';

@NgModule({
  declarations: [OverlayLockComponent],
  exports: [
    OverlayLockComponent
  ],
  imports: [
    MatIconModule
  ]
})
export class OverlayLockModule { }
