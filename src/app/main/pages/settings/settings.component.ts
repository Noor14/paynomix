import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { UserConfigService } from '@fuse/services/user.config.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit, OnDestroy {
   public basicInfoVisibility: boolean = false;
   private _unsubscribeAll: Subject<any>;

   constructor(private readonly _userConfigService:  UserConfigService) {
    this._unsubscribeAll = new Subject();
   }

   ngOnInit(): void {
    this._userConfigService.userModeChange
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((res) => {
     this.basicInfoVisibility = res && !!Object.keys(res).length
    });
   }

   ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

