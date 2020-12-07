import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpBlockingComponent } from './ip-blocking/ip-blocking.component';
import { RestrictedTransactionComponent } from './restricted-transaction/restricted-transaction.component';
import { CountryOriginComponent } from './country-origin/country-origin.component';
import { ProxyBlockingComponent } from './proxy-blocking/proxy-blocking.component';
import { TransactionControlsComponent } from './transaction-controls.component';
import { TransactionControlsRoutingModule } from './transaction-controls-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { IpBlockingTableComponent } from './ip-blocking/ip-blocking-table/ip-blocking-table.component';
import { NgxMaskModule } from 'ngx-mask';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { IpAddressComponent } from './ip-blocking/ip-address/ip-address.component';
import { MatListModule } from '@angular/material/list';
import { OverlayLockModule } from '@fuse/components/overlay-lock/overlay-lock.module';
import { lockControlsModule } from '../common-components/lock-controls/lock-controls.module';
import { CountryBlockingIpComponent } from './country-origin/country-blocking-ip/country-blocking-ip.component';
import { ipBlockingStatusModule } from '../common-components/ip-blocking-status/ip-blocking-status.module';
import { CountryStatusModule } from '../common-components/country-status/country-status.module';

@NgModule({
  declarations: [
    IpBlockingComponent, 
    RestrictedTransactionComponent, 
    CountryOriginComponent, 
    ProxyBlockingComponent, 
    TransactionControlsComponent,
    IpBlockingTableComponent,
    IpAddressComponent,
    CountryBlockingIpComponent,
  ],
  entryComponents:[
    IpBlockingTableComponent
  ],
  imports: [
    CommonModule,
    TransactionControlsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule ,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    FuseSharedModule,
    MatRadioModule,
    NgxMaskModule.forRoot(),
    MatListModule,
    OverlayLockModule,
    lockControlsModule,
    ipBlockingStatusModule,
    CountryStatusModule
  ]
})
export class TransactionControlsModule { }
