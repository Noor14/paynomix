import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailDialogComponent } from './email-dialog.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [EmailDialogComponent],
  entryComponents: [EmailDialogComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    FuseSharedModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
  ]
})
export class EmailDialogModule { }
