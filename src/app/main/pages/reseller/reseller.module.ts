import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResellerRoutingModule } from './reseller-routing.module';
import { ResellerListComponent } from './reseller-list/reseller-list.component';


@NgModule({
  declarations: [
    ResellerListComponent
  ],
  imports: [
    CommonModule,
    ResellerRoutingModule
  ]
})
export class ResellerModule { }
