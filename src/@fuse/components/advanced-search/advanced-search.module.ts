import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedSearchComponent } from './advanced-search.component';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [AdvancedSearchComponent],
  entryComponents: [
    AdvancedSearchComponent
  ],
  exports: [AdvancedSearchComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    FuseSharedModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule

  ]
})
export class AdvancedSearchModule { }
