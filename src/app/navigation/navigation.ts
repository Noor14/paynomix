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
                id       : 'sample',
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
                id       : 'sample',
                title    : 'Merchants',
                type     : 'item',
                icon     : 'people',
                url      : '/sampldde'
            },
            {
                id       : 'sample',
                title    : 'Partners',
                type     : 'item',
                icon     : 'attachment',
                url      : '/samplsde'
            },
            {
                id       : 'sample',
                title    : 'Resellers',
                type     : 'item',
                icon     : 'euro_symbol',
                url      : '/sampldse'
            },
            {
                id       : 'sample',
                title    : 'Pricing Plan',
                type     : 'item',
                icon     : 'event_note',
                url      : '/samplde'
            },
            {
                id       : 'sample',
                title    : 'Transaction',
                type     : 'item',
                icon     : 'attach_money',
                url      : '/samples'
            },
            {
                id       : 'sample',
                title    : 'Funding Manager',
                type     : 'item',
                icon     : 'account_balance',
                url      : '/samples'
            },
            {
                id       : 'sample',
                title    : 'Settings',
                type     : 'item',
                icon     : 'settings',
                url      : '/samples'
            },
            {
                id       : 'sample',
                title    : 'Make a Sale',
                type     : 'item',
                icon     : 'account_balance_wallet',
                url      : '/samples'
            }
];
