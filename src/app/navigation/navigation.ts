import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
            {
                id       : 'dashboard',
                title    : 'Dashboard',
                type     : 'item',
                icon     : 'bar_chart',
                url      : '/pages/dashboard'
            },
            {
                id       : 'partner',
                title    : 'Partners',
                type     : 'item',
                icon     : 'local_parking',
                url      : '/pages/partner/partner-list'
            },
            {
                id       : 'reseller',
                title    : 'Resellers',
                type     : 'item',
                icon     : 'device_hub',
                url      : '/pages/reseller/reseller-list'
            },
               {
                id       : 'merchant',
                title    : 'Merchants',
                type     : 'item',
                icon     : 'home',
                url      : '/pages/merchant/merchant-list'
            },
            {
                id       : 'pricing',
                title    : 'Pricing Plan',
                type     : 'item',
                icon     : 'event_note',
                url      : '/pages/pricing-plan/pricing-plan-list'
            },
            {
                id       : 'sale',
                title    : 'Make a Sale',
                type     : 'item',
                icon     : 'account_balance_wallet',
                url      : '/samples'
            },
            {
                id       : 'transaction',
                title    : 'Transaction',
                type     : 'item',
                icon     : 'attach_money',
                url      : '/samples'
            },
            {
                id       : 'fund',
                title    : 'Funding Manager',
                type     : 'item',
                icon     : 'account_balance',
                url      : '/samples'
            },
            {
                id       : 'user_mgmt',
                title    : 'User Managment',
                type     : 'collapsable',
                icon     : 'supervised_user_circle',
                children : [
                    {
                        id       : 'user',
                        title    : 'Users',
                        type     : 'item',
                        icon     : 'person_outline',
                        url      : '/pages/user/user-list'
                    }
               ]
            },
            {
                id       : 'setting',
                title    : 'Settings',
                type     : 'item',
                icon     : 'settings',
                url      : '/pages/settings'
            }
            
];
