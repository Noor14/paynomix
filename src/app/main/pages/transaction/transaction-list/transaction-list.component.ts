import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { UserConfigService } from '@fuse/services/user.config.service';
import { TransactionTableComponent } from '../transaction-table/transaction-table.component';
import { TransactionService } from '../transaction.service';
import { pipe, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NoFoundComponent } from '@fuse/components/no-found/no-found.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  @ViewChild('renderingContainer', { read: ViewContainerRef, static: false }) container: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  public transaction: any =[];
  private _unsubscribeAll: Subject<any>;
  //  @param {ComponentFactoryResolver} _resolver
  //  @param {TransactionService} _transactionService
  //  @param {UserConfigService} _userConfigService


  constructor(
    private readonly _transactionService: TransactionService,
    private readonly _userConfigService: UserConfigService,
    private readonly _resolver: ComponentFactoryResolver
  ) { 
       // Set the private defaults
       this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._userConfigService.userModeChange
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(() => this.getTransaction())
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
}

  renderingComponent(type, data?) {
    const factory: ComponentFactory<any> = this._resolver.resolveComponentFactory(type);
      this.container.clear();
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.data = data;
  }
  getTransaction(): void{
    this._transactionService.transactionList(this._userConfigService.getUserMode())
    .then((res: any) => {
      if(res && !res.StatusCode){
        if(res.Response && res.Response.length){
          this.transaction = res.Response;
          this.renderingComponent(TransactionTableComponent,{
            transaction: this.transaction,
          })
        }else{
          this.renderingComponent(NoFoundComponent, {
            icon: 'supervised_user_circle',
            text: 'No user found'
          });
        }
      }
    }).catch(()=>(console.log))
  }

}
