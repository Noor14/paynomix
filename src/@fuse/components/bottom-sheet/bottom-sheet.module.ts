import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomSheetComponent } from './bottom-sheet.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FusePipesModule } from '@fuse/pipes/pipes.module';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [BottomSheetComponent],
  exports     : [
    BottomSheetComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    FusePipesModule,
    MatTooltipModule
  ]
})
export class BottomSheetModule { }
