import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SettingsComponent } from './settings/settings.component';
import { MatIconModule } from '@angular/material/icon';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseSharedModule } from '@fuse/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutModule,
    FuseSharedModule,
    MatIconModule,
    ChartsModule,
    NgxChartsModule,

  ]
})
export class PagesModule { }
