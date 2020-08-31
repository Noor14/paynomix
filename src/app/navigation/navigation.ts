import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
            {
                id       : 'dashboard',
                title    : 'Dashboard',
                type     : 'item',
                icon     : 'bar_chart',
                url      : '/sample'
            },
            {
                id       : 'partner',
                title    : 'Partners',
                type     : 'item',
                icon     : 'local_parking',
                url      : '/samplsde'
            },
            {
                id       : 'reseller',
                title    : 'Resellers',
                type     : 'item',
                icon     : 'device_hub',
                url      : '/sampldse'
            },
               {
                id       : 'merchant',
                title    : 'Merchants',
                type     : 'item',
                icon     : 'home',
                url      : '/sampldde'
            },
            {
                id       : 'pricing',
                title    : 'Pricing Plan',
                type     : 'item',
                icon     : 'event_note',
                url      : '/samplde'
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
                        id       : 'sample',
                        title    : 'Users',
                        type     : 'item',
                        icon     : 'person_outline',
                        url      : '/users'
                    }
               ]
            },
            {
                id       : 'setting',
                title    : 'Settings',
                type     : 'item',
                icon     : 'settings',
                url      : '/samples'
            }
            
];
