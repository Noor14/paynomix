import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HierarchicalTreeComponent } from './hierarchical-tree.component';
import { MatButtonModule } from '@angular/material/button';
import {MatTreeModule} from '@angular/material/tree';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FusePipesModule } from '@fuse/pipes/pipes.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HierarchicalTreeComponent],
  exports: [HierarchicalTreeComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    FusePipesModule,
    FormsModule
  ]
})
export class HierarchicalTreeModule { }
