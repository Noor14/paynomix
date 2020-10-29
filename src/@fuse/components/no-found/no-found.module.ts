import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoFoundComponent } from './no-found.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [NoFoundComponent],
  exports: [NoFoundComponent],
  entryComponents: [NoFoundComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
  ]
})
export class NoFoundModule { }
