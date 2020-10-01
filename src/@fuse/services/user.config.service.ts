import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserConfigService {

    private userMode = new BehaviorSubject<any>(null);
    public loggedInUser:any = {};
    public userModeChange = this.userMode.asObservable();
    
    constructor() { }

    public setUserMode(obj: object) {
        this.userMode.next(obj);
        if(obj != null &&
            this.loggedInUser && 
            !Object.keys(this.loggedInUser).length)
            this.loggedInUser = obj;
      }
    public getUserMode() {
        return this.userMode.getValue();
    }
}