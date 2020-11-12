import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSidebarModule } from '@fuse/components';
import { SlidingPanelModule } from '@fuse/components/sliding-panel/sliding-panel.module';
import { FuseSharedModule } from '@fuse/shared.module';

import { ContentModule } from 'app/layout/components/content/content.module';
import { FooterModule } from 'app/layout/components/footer/footer.module';
import { NavbarModule } from 'app/layout/components/navbar/navbar.module';
import { QuickPanelModule } from 'app/layout/components/quick-panel/quick-panel.module';
import { ToolbarModule } from 'app/layout/components/toolbar/toolbar.module';

import { VerticalLayout1Component } from 'app/layout/vertical/layout-1/layout-1.component';
import { PartnerModule } from 'app/main/pages/partner/partner.module';
import { PricingPlanModule } from 'app/main/pages/pricing-plan/pricing-plan.module';
import { ResellerModule } from 'app/main/pages/reseller/reseller.module';

@NgModule({
    declarations: [
        VerticalLayout1Component
    ],
    imports     : [
        RouterModule,

        FuseSharedModule,
        FuseSidebarModule,
        SlidingPanelModule,

        ContentModule,
        FooterModule,
        NavbarModule,
        QuickPanelModule,
        ToolbarModule,
        PartnerModule,
        PricingPlanModule,
        ResellerModule,
        PricingPlanModule
    ],
    exports     : [
        VerticalLayout1Component
    ]
})
export class VerticalLayout1Module
{
}
