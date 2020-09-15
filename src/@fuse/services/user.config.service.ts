import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserConfigService {

    private userMode = new BehaviorSubject<any>(null);
    public userModeChange = this.userMode.asObservable();
    
    constructor() { }

    public setUserMode(obj: object) {
        this.userMode.next(obj);
      }
    public getUserMode() {
        return this.userMode.getValue();
    }
}