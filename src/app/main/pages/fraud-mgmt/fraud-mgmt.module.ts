import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';

import { FraudMgmtRoutingModule } from './fraud-mgmt-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FraudMgmtRoutingModule,
    MatRadioModule
  ]
})
export class FraudMgmtModule { }
