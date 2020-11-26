import { HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NoFoundComponent } from '@fuse/components/no-found/no-found.component';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserTableComponent } from '../user-table/user-table.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  @ViewChild('renderingContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  private componentRef: ComponentRef<any>;

  public users: any= [];
  private _unsubscribeAll: Subject<any>;

     /**
     * Constructor
     *
     * @param {ResellerService} _resellerService
     * @param {UserConfigService} _userConfigService
     * @param {ComponentFactoryResolver} _resolver
     */
    
    constructor(
      private readonly _userService: UserService,
      private readonly _userConfigService: UserConfigService,
      private readonly _resolver: ComponentFactoryResolver
  ) { 
            // Set the private defaults
            this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._userConfigService.userModeChange
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(() => this.getUsers()); 
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
      this.componentRef.instance.updateList.subscribe(res=>{
        if(res){
          this.getUsers();
        }
      })
  }
  getUsers(): void{
    this._userService.userList(this._userConfigService.getUserMode())
    .then((res: any) => {
      if(res && !res.StatusCode){
        if(res.Response && res.Response.length){
          this.users = res.Response;
          this.renderingComponent(UserTableComponent,{
            users: this.users,
          })
        }else{
          this.renderingComponent(NoFoundComponent, {
            icon: 'supervised_user_circle',
            text: 'No user found'
          });
        }
      }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

}
