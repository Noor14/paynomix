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
                title    : 'Make a Sale',
                type     : 'item',
                icon     : 'account_balance_wallet',
                url      : '/pages/sale',
                roles    : Object.values(authRole).filter(item => typeof item === 'number')

            },
            {
                id       : 'transaction',
                title    : 'Transaction',
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
                        title    : 'Transaction Controls',
                        type     : 'item',
                        svgIcon     : 'transaction-control',
                        url      : '/pages/fraud-mgmt'
                    },
                    {
                        id       : 'velocityCtrl',
                        title    : 'Velocity Controls',
                        type     : 'item',
                        svgIcon     : 'velocity-control',
                        url      : '/pages/user'
                    },
                    {
                        id       : 'verificatoionTool',
                        title    : 'Verification Tools',
                        type     : 'item',
                        svgIcon     : 'verification',
                        url      : '/pages/user'
                    },
                    {
                        id       : 'blockingTool',
                        title    : 'Blocking Tools',
                        type     : 'item',
                        icon     : 'block',
                        url      : '/pages/user'
                    },
                    {
                        id       : 'transAlert',
                        title    : 'Transaction Alerts',
                        type     : 'item',
                        svgIcon     : 'transaction-alert',
                        url      : '/pages/user'
                    },
                    {
                        id       : 'chargeBackTool',
                        title    : 'Charge Back Tools',
                        type     : 'item',
                        svgIcon     : 'charge-back',
                        url      : '/pages/user'
                    },
                    {
                        id       : 'achTool',
                        title    : 'ACH Tools',
                        type     : 'item',
                        svgIcon     : 'ach',
                        url      : '/pages/user'
                    }
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
