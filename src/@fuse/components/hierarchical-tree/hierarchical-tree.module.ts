import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HierarchicalTreeComponent } from './hierarchical-tree.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [HierarchicalTreeComponent],
  exports: [HierarchicalTreeComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class HierarchicalTreeModule { }
