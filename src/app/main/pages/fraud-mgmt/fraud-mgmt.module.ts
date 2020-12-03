import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FraudMgmtRoutingModule } from './fraud-mgmt-routing.module';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FraudMgmtRoutingModule,
    MatRadioModule,
    NgxMaskModule.forRoot()
  ]
})
export class FraudMgmtModule { }
