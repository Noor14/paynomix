import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoFoundComponent } from './no-found.component';

@NgModule({
  declarations: [NoFoundComponent],
  exports:[ NoFoundComponent],
  entryComponents: [NoFoundComponent],
  imports: [
    CommonModule
  ]
})
export class NoFoundModule { }
