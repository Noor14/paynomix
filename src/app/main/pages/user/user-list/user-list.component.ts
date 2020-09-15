import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns = ['UserRole', 'Username', 'Email', 'LastLogin', 'Action'];
  public dataSource = new MatTableDataSource<any>();
  public users: any= [];
  private _unsubscribeAll: Subject<any>;

     /**
     * Constructor
     *
     * @param {ResellerService} _resellerService
     * @param {UserConfigService} _userConfigService
     */
    
    constructor(
      private readonly _userService: UserService,
      private readonly _userConfigService: UserConfigService
  ) { 
            // Set the private defaults
            this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._userConfigService.userModeChange
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(() => this.getUsers())
  }

  ngOnDestroy(): void {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  getUsers(): void{
    this._userService.userList(this._userConfigService.getUserMode())
    .then((res: any) => {
        if(res && !res.StatusCode){
            this.users = res.Response;
            this.dataSource.data = this.users;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }).catch((err: HttpErrorResponse)=>(console.log))
  }

}
