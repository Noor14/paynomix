import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserConfigService } from '@fuse/services/user.config.service';
import { FraudMgmtService } from '../fraud-mgmt.service';

@Component({
  selector: 'app-transaction-controls',
  templateUrl: './transaction-controls.component.html',
  styleUrls: ['./transaction-controls.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionControlsComponent implements OnInit {
 public fraudType:any
  constructor(
    private readonly _fraudManagementService: FraudMgmtService,
    private readonly _userConfigService: UserConfigService,
  ) { }

  ngOnInit() {
  }
 
}
