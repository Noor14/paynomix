import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResellerRoutingModule } from './reseller-routing.module';
import { ResellerListComponent } from './reseller-list/reseller-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { ResellerCreateComponent } from './reseller-create/reseller-create.component';
import { ResellerEditComponent } from './reseller-edit/reseller-edit.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ResellerFormComponent } from './reseller-form/reseller-form.component';


@NgModule({
  declarations: [
    ResellerListComponent,
    ResellerCreateComponent,
    ResellerEditComponent,
    ResellerFormComponent
  ],
  imports: [
    CommonModule,
    ResellerRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    FuseSharedModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ]
})
export class ResellerModule { }
