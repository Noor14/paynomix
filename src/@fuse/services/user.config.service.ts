import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserConfigService {

    public loggedInUser:any = {};
    private userMode = new BehaviorSubject<any>(null);
    public userModeChange = this.userMode.asObservable();
    private userHierarchy = new BehaviorSubject<any>(null);
    public getUserHierarchy = this.userHierarchy.asObservable();
    
    constructor() { }
    public setHierarchy(data) {
        this.userHierarchy.next(data);
    }
    public setUserMode(obj: object) {
        this.userMode.next(obj);
    }
    public getUserMode() {
        return this.userMode.getValue();
    }
}