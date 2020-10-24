import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { LayoutModule } from 'app/layout/layout.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutModule,
    MatDatepickerModule,
  ]
})
export class PagesModule { }
