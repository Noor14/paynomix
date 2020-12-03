import { FuseNavigation } from '@fuse/types';
import { authRole } from '../../constants/globalFunctions';

export const navigation: FuseNavigation[] = [
            {
                id       : 'dashboard',
                title    : 'Dashboard',
                type     : 'item',
                icon     : 'bar_chart',
                url      : '/pages/dashboard',
                roles    :  Object.values(authRole).filter(item => typeof item === 'number')
            },
            {
                id       : 'partner',
                title    : 'Partners',
                type     : 'item',
                icon     : 'local_parking',
                url      : '/pages/partner',
                roles    : [authRole.admin]

            },
            {
                id       : 'reseller',
                title    : 'Resellers',
                type     : 'item',
                icon     : 'device_hub',
                url      : '/pages/reseller',
                roles    :  [ authRole.admin, authRole.partner ]

            },
               {
                id       : 'merchant',
                title    : 'Merchants',
                type     : 'item',
                icon     : 'home',
                url      : '/pages/merchant',
                roles    :  [ authRole.admin,  authRole.partner, authRole.reseller]

            },
            {
                id       : 'pricing',
                title    : 'Pricing Plan',
                type     : 'item',
                icon     : 'event_note',
                url      : '/pages/pricing-plan',
                roles    :  [ authRole.admin,  authRole.partner, authRole.reseller]

            },
            {
                id       : 'sale',
                title    : 'Make A Sale',
                type     : 'item',
                icon     : 'account_balance_wallet',
                url      : '/pages/sale',
                roles    : Object.values(authRole).filter(item => typeof item === 'number')

            },
            {
                id       : 'transaction',
                title    : 'Transactions',
                type     : 'item',
                icon     : 'attach_money',
                url      : '/pages/transaction',
                roles    : Object.values(authRole).filter(item => typeof item === 'number')

            },
            {
                id       : 'fund',
                title    : 'Funding Manager',
                type     : 'item',
                icon     : 'account_balance',
                url      : '/pages/funds',
                roles:   [ authRole.admin]
            },
            {
                id       : 'user_mgmt',
                title    : 'User Managment',
                type     : 'collapsable',
                icon     : 'supervised_user_circle',
                roles    :    [authRole.admin, authRole.partner, authRole.reseller, authRole.merchant],
                children : [
                    {
                        id       : 'user',
                        title    : 'Users',
                        type     : 'item',
                        icon     : 'person_outline',
                        url      : '/pages/user'
                    }
               ]
            },
            {
                id       : 'fraud_mgmt',
                title    : 'Fraud Managment',
                type     : 'collapsable',
                svgIcon     : 'fraud',
                roles    :    Object.values(authRole).filter(item => typeof item === 'number'),
                children : [
                    {
                        id       : 'transCtrl',
                        title    : 'Transaction Source Controls',
                        type     : 'item',
                        svgIcon     : 'transaction-control',
                        url      : '/pages/fraud-mgmt/transaction-control'
                    },
                    // {
                    //     id       : 'velocityCtrl',
                    //     title    : 'Velocity Controls',
                    //     type     : 'item',
                    //     svgIcon     : 'velocity-control',
                    //     url      : '/pages/fraud-mgmt/velocity-control'
                    // },
                    {
                        id       : 'transDataCtrl',
                        title    : 'Transaction Data Controls',
                        type     : 'item',
                        svgIcon     : 'verification',
                        url      : '/pages/fraud-mgmt/transaction-data-control'
                    },
                 
               ]
            },
            {
                id       : 'setting',
                title    : 'Settings',
                type     : 'item',
                icon     : 'settings',
                url      : '/pages/settings',
                roles    : Object.values(authRole).filter(item => typeof item === 'number')

            }
            
];
