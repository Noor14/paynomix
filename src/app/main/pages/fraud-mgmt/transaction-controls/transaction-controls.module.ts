import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpBlockingComponent } from './ip-blocking/ip-blocking.component';
import { RestrictedTransactionComponent } from './restricted-transaction/restricted-transaction.component';
import { CountryOriginComponent } from './country-origin/country-origin.component';
import { ProxyBlockingComponent } from './proxy-blocking/proxy-blocking.component';
import { TransactionControlsComponent } from './transaction-controls.component';


@NgModule({
  declarations: [
    IpBlockingComponent, 
    RestrictedTransactionComponent, 
    CountryOriginComponent, 
    ProxyBlockingComponent, 
    TransactionControlsComponent],
  imports: [
    CommonModule,
  ]
})
export class TransactionControlsModule { }
