import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HierarchicalTreeComponent } from './hierarchical-tree.component';
import { MatButtonModule } from '@angular/material/button';
import {MatTreeModule} from '@angular/material/tree';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HierarchicalTreeService } from './hierarchical-tree.service';

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
  ],
  providers: [
    HierarchicalTreeService
]
})
export class HierarchicalTreeModule { }
