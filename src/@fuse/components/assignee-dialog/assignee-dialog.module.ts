import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssigneeDialogComponent } from './assignee-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { FuseSharedModule } from '@fuse/shared.module';
@NgModule({
  declarations: [AssigneeDialogComponent],
  entryComponents: [AssigneeDialogComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,

  ]
})
export class AssigneeDialogModule { }
