import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FraudMgmtRoutingModule } from './fraud-mgmt-routing.module';
import { FuseSharedModule } from '@fuse/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FuseSharedModule,
    FraudMgmtRoutingModule,
  ],
  declarations: []
})
export class FraudMgmtModule { }
