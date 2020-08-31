import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { LayoutModule } from 'app/layout/layout.module';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { ResellerListComponent } from './reseller-list/reseller-list.component';


@NgModule({
  declarations: [DashboardComponent, PagesComponent, PartnerListComponent, ResellerListComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutModule
  ]
})
export class PagesModule { }
