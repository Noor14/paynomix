import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionDataControlRoutingModule } from './transaction-data-control-routing.module';
import { TransactionDataControlComponent } from './transaction-data-control.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LargeTransNotificationComponent } from './large-trans-notification/large-trans-notification.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { lockControlsModule } from '../common-components/lock-controls/lock-controls.module';


@NgModule({
  declarations: [
    TransactionDataControlComponent,
    LargeTransNotificationComponent,
  ],
  imports: [
    CommonModule,
    TransactionDataControlRoutingModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule ,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    FuseSharedModule,
    MatRadioModule,
    MatListModule,
    NgxCurrencyModule,
    lockControlsModule
  ]
})
export class TransactionDataControlModule { }
