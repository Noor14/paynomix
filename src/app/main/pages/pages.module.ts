import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { LayoutModule } from 'app/layout/layout.module';
import { HierarchicalTreeService } from '@fuse/components/hierarchical-tree/hierarchical-tree.service';

@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutModule,
  ],
  providers: [
    HierarchicalTreeService
  ]
})

export class PagesModule { }
