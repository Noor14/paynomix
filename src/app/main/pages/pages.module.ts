import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { LayoutModule } from 'app/layout/layout.module';
import { HierarchicalTreeService } from '@fuse/components/hierarchical-tree/hierarchical-tree.service';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutModule,
    NgIdleKeepaliveModule.forRoot(),
    MatButtonModule
  ],
  providers: [
    HierarchicalTreeService
  ]
})

export class PagesModule { }
