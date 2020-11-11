import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { navigation } from 'app/navigation/navigation';
import {PartnerCreateComponent} from '../../../main/pages/partner/partner-create/partner-create.component'
import { ResellerCreateComponent } from '../../../main/pages/reseller/reseller-create/reseller-create.component';
import { PricingPlanCreateComponent } from '../../../main/pages/pricing-plan/pricing-plan-create/pricing-plan-create.component';

@Component({
    selector     : 'vertical-layout-1',
    templateUrl  : './layout-1.component.html',
    styleUrls    : ['./layout-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VerticalLayout1Component implements OnInit, OnDestroy
{
    @ViewChild('renderingComponent', { read: ViewContainerRef, static: false }) container: ViewContainerRef;
    private componentRef: ComponentRef<any>;

    fuseConfig: any;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private readonly _resolver: ComponentFactoryResolver
    )
    {
        // Set the defaults
        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.fuseConfig = config;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    renderComponent(value) {
        let factory:ComponentFactory<any>;
        this.container.clear();
        factory = this._resolver.resolveComponentFactory(rendererType[value]);
        this.componentRef = this.container.createComponent(factory); 
    }
}
export const rendererType = {
    PartnerCreateComponent,
    PricingPlanCreateComponent,
    ResellerCreateComponent
  }