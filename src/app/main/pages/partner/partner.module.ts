import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerListComponent } from './partner-list/partner-list.component';


@NgModule({
  declarations: [PartnerListComponent],
  imports: [
    CommonModule,
    PartnerRoutingModule
  ]
})
export class PartnerModule { }
