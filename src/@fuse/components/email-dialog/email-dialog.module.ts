import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailDialogComponent } from './email-dialog.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatToolbarModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import {MatChipsModule} from '@angular/material/chips';



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
    MatChipsModule
  ]
})
export class EmailDialogModule { }
