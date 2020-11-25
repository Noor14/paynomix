import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { UserConfigService } from '@fuse/services/user.config.service';
import { TransactionTableComponent } from '../transaction-table/transaction-table.component';
import { TransactionService } from '../transaction.service';
import { pipe, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NoFoundComponent } from '@fuse/components/no-found/no-found.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  @ViewChild('renderingContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  private _unsubscribeAll: Subject<any>;
  public transactionType: any = {};
  dateRangeForm: FormGroup;
  dateTo = moment().format('YYYY-MM-DD');
  dateFrom = moment().subtract(15,'d').format('YYYY-MM-DD');
  /**
     * Constructor
     *
     * @param {UserConfigService} _userConfigService
     * @param {TransactionService} _transactionService
     * @param {ComponentFactoryResolver} _resolver
     */



  constructor(
    private readonly _transactionService: TransactionService,
    private readonly _userConfigService: UserConfigService,
    private readonly _resolver: ComponentFactoryResolver,
    private readonly _formBuilder: FormBuilder,
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
  this.rangeForm();

    this._userConfigService.userModeChange
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => this.getTransaction())
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this.componentRef && this.componentRef.destroy();
  }

   renderingComponent(type, data?) {
    const factory: ComponentFactory<any> = this._resolver.resolveComponentFactory(type);
    this.container.clear();
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.data = data;
    this.componentRef.instance.updateList.subscribe(res => {
      if (res) {
        this.getTransaction();
      }
    });
  }
  getTransaction(): void {
    this._transactionService.transactionList(this._userConfigService.getUserMode())
      .then((res: any) => {
        if (res && !res.StatusCode) {
          this.transactionType = res.Response.TotalTransaction;
          if (res.Response && res.Response.Transactions.length) {
            this.renderingComponent(TransactionTableComponent, {
              transaction: res.Response.Transactions
            });
          } else {
            this.renderingComponent(NoFoundComponent, {
              icon: 'no-transaction',
              text: 'No Transaction Found',
              subText: "You Haven't made any Transaction yet"
            });
          }
        }
      }).catch(() => (console.log))
  }
  rangeForm() {
    this.dateRangeForm = this._formBuilder.group({
      FromDate: [this.dateFrom, Validators.required], 
      ToDate: [this.dateTo, Validators.required]  
    });
  }
  valueChange(value) {
   console.log('value', value);
  }
}
