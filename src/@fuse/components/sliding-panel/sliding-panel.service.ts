import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SlidingPanelComponent } from './sliding-panel.component';

@Injectable({
  providedIn: 'root'
})
export class SlidingPanelService {
  // Private
  private componentName = new BehaviorSubject<any>(null);
  public componentNameChange = this.componentName.asObservable();
  private panel = new BehaviorSubject<any>(null);
  public panelChange = this.panel.asObservable();
  private _registry: { [key: string]: SlidingPanelComponent } = {};

  /**
   * Constructor
   */
  constructor() {

  }

  /**
   * Add the sidebar to the registry
   *
   * @param key
   * @param sidebar
   */
  register(key, sidebar): void {
    // Check if the key already being used
    if (this._registry[key]) {
      console.error(`The sidebar with the key '${key}' already exists. Either unregister it first or use a unique key.`);

      return;
    }

    // Add to the registry
    this._registry[key] = sidebar;
  }

  /**
   * Remove the sidebar from the registry
   *
   * @param key
   */
  unregister(key): void {
    // Check if the sidebar exists
    if (!this._registry[key]) {
      console.warn(`The sidebar with the key '${key}' doesn't exist in the registry.`);
    }

    // Unregister the sidebar
    delete this._registry[key];
  }

  /**
   * Return the sidebar with the given key
   *
   * @param key
   * @param rendringComponent
   * @returns {SlidingPanelComponent}
   */
  getSidebar(key, componentName, data?): SlidingPanelComponent {

    // Check if the sidebar exists
    if (!this._registry[key]) {
      console.warn(`The sidebar with the key '${key}' doesn't exist in the registry.`);

      return;
    }
    // Return the sidebar
    this.setComponentName(componentName, data);
    return this._registry[key];
  }
  closeSlidingPanel(key): SlidingPanelComponent {
    if (!this._registry[key]) {
      console.warn(`The sidebar with the key '${key}' doesn't exist in the registry.`);

      return;
    }
    // Return the sidebar 
    return this._registry[key];
  }

  getComponentName() {
    return this.componentName.getValue();
  }
  setComponentName(name, data?) {
    const obj = {
      componentName: name,
      data
    }
    return this.componentName.next(obj);
  }
  setSlidingPanelStatus(status): any {
    return this.panel.next(status);
  }
  getSlidingPanelStatus(): any {
    return this.panel.getValue();
  }

}
