import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpBlockingComponent } from './ip-blocking/ip-blocking.component';
import { RestrictedTransactionComponent } from './restricted-transaction/restricted-transaction.component';
import { CountryOriginComponent } from './country-origin/country-origin.component';
import { ProxyBlockingComponent } from './proxy-blocking/proxy-blocking.component';
import { TransactionControlsComponent } from './transaction-controls.component';
import { TransactionControlsRoutingModule } from './transaction-controls-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
@NgModule({
  declarations: [
    IpBlockingComponent, 
    RestrictedTransactionComponent, 
    CountryOriginComponent, 
    ProxyBlockingComponent, 
    TransactionControlsComponent],
  imports: [
    CommonModule,
    TransactionControlsRoutingModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule ,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    FuseSharedModule,
    MatRadioModule
    
  ]
})
export class TransactionControlsModule { }
