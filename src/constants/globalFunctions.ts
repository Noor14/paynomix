import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

export function validateAllFormFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {  
      const control = formGroup.get(field);            
      if (control instanceof FormControl) {             
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        
        this.validateAllFormFields(control);            
      }
    });
};
export const snackBarConfig: any = {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'right',
    panelClass: 'fuse-navy-50'
};
export const snackBarConfigWarn = {
  ...snackBarConfig,
  panelClass: 'warn'
};
export function validateRequiredControl(control: AbstractControl, isRequired: boolean){
    if(isRequired && !control.value){
        return {required:  true}
    }

}

export enum authRole {
admin = 1,
merchant,
partner,
reseller,
customer
}
export enum transactionType{
CreditCardVoid,
CreditCardSale,
CreditCardAuth,
CreditCardFund,
CreditCardRefund,
CreditCardCapture,
ACHDebit,
ACHRefund,
ACHVoid,
}
export enum transactionStatus{
declined,
approved,
pending,
funded,
error,
init
}

export const locationConfig =
{
    states: [
        {
            name: 'Alabama',
            abbreviation: 'AL'
        },
        {
            name: 'Alaska',
            abbreviation: 'AK'
        },
        {
            name: 'American Samoa',
            abbreviation: 'AS'
        },
        {
            name: 'Arizona',
            abbreviation: 'AZ'
        },
        {
            name: 'Arkansas',
            abbreviation: 'AR'
        },
        {
            name: 'California',
            abbreviation: 'CA'
        },
        {
            name: 'Colorado',
            abbreviation: 'CO'
        },
        {
            name: 'Connecticut',
            abbreviation: 'CT'
        },
        {
            name: 'Delaware',
            abbreviation: 'DE'
        },
        {
            name: 'District Of Columbia',
            abbreviation: 'DC'
        },
        {
            name: 'Federated States Of Micronesia',
            abbreviation: 'FM'
        },
        {
            name: 'Florida',
            abbreviation: 'FL'
        },
        {
            name: 'Georgia',
            abbreviation: 'GA'
        },
        {
            name: 'Guam',
            abbreviation: 'GU'
        },
        {
            name: 'Hawaii',
            abbreviation: 'HI'
        },
        {
            name: 'Idaho',
            abbreviation: 'ID'
        },
        {
            name: 'Illinois',
            abbreviation: 'IL'
        },
        {
            name: 'Indiana',
            abbreviation: 'IN'
        },
        {
            name: 'Iowa',
            abbreviation: 'IA'
        },
        {
            name: 'Kansas',
            abbreviation: 'KS'
        },
        {
            name: 'Kentucky',
            abbreviation: 'KY'
        },
        {
            name: 'Louisiana',
            abbreviation: 'LA'
        },
        {
            name: 'Maine',
            abbreviation: 'ME'
        },
        {
            name: 'Marshall Islands',
            abbreviation: 'MH'
        },
        {
            name: 'Maryland',
            abbreviation: 'MD'
        },
        {
            name: 'Massachusetts',
            abbreviation: 'MA'
        },
        {
            name: 'Michigan',
            abbreviation: 'MI'
        },
        {
            name: 'Minnesota',
            abbreviation: 'MN'
        },
        {
            name: 'Mississippi',
            abbreviation: 'MS'
        },
        {
            name: 'Missouri',
            abbreviation: 'MO'
        },
        {
            name: 'Montana',
            abbreviation: 'MT'
        },
        {
            name: 'Nebraska',
            abbreviation: 'NE'
        },
        {
            name: 'Nevada',
            abbreviation: 'NV'
        },
        {
            name: 'New Hampshire',
            abbreviation: 'NH'
        },
        {
            name: 'New Jersey',
            abbreviation: 'NJ'
        },
        {
            name: 'New Mexico',
            abbreviation: 'NM'
        },
        {
            name: 'New York',
            abbreviation: 'NY'
        },
        {
            name: 'North Carolina',
            abbreviation: 'NC'
        },
        {
            name: 'North Dakota',
            abbreviation: 'ND'
        },
        {
            name: 'Northern Mariana Islands',
            abbreviation: 'MP'
        },
        {
            name: 'Ohio',
            abbreviation: 'OH'
        },
        {
            name: 'Oklahoma',
            abbreviation: 'OK'
        },
        {
            name: 'Oregon',
            abbreviation: 'OR'
        },
        {
            name: 'Palau',
            abbreviation: 'PW'
        },
        {
            name: 'Pennsylvania',
            abbreviation: 'PA'
        },
        {
            name: 'Puerto Rico',
            abbreviation: 'PR'
        },
        {
            name: 'Rhode Island',
            abbreviation: 'RI'
        },
        {
            name: 'South Carolina',
            abbreviation: 'SC'
        },
        {
            name: 'South Dakota',
            abbreviation: 'SD'
        },
        {
            name: 'Tennessee',
            abbreviation: 'TN'
        },
        {
            name: 'Texas',
            abbreviation: 'TX'
        },
        {
            name: 'Utah',
            abbreviation: 'UT'
        },
        {
            name: 'Vermont',
            abbreviation: 'VT'
        },
        {
            name: 'Virgin Islands',
            abbreviation: 'VI'
        },
        {
            name: 'Virginia',
            abbreviation: 'VA'
        },
        {
            name: 'Washington',
            abbreviation: 'WA'
        },
        {
            name: 'West Virginia',
            abbreviation: 'WV'
        },
        {
            name: 'Wisconsin',
            abbreviation: 'WI'
        },
        {
            name: 'Wyoming',
            abbreviation: 'WY'
        }
      ],
    countries: [{
        code: 'US',
        name: 'United States'
    }]
} 
export const truncateTextLength = 25;

export const validator = {
  emailPattern : /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
  number : /^[0-9]+$/,
  zipMaxLength: 5,
  accMaxLength: 17,
  maxPercentage: 100,
  maxRoutingNo: 9,
  minRoutingNo: 9,
  maxName: 25,
  maxFieldLength:35,
  passwordPattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$!%*.#?&]{0,}$/,
  minPasswordLength: 8
};

export const Countries = {

    countries: [ 
        {name: 'Afghanistan', code: 'AF', IsActive : false}, 
        {name: 'Åland Islands', code: 'AX', IsActive : false}, 
        {name: 'Albania', code: 'AL', IsActive : false}, 
        {name: 'Algeria', code: 'DZ', IsActive : false}, 
        {name: 'American Samoa', code: 'AS', IsActive : false}, 
        {name: 'AndorrA', code: 'AD', IsActive : false}, 
        {name: 'Angola', code: 'AO', IsActive : false}, 
        {name: 'Anguilla', code: 'AI', IsActive : false}, 
        {name: 'Antarctica', code: 'AQ', IsActive : false}, 
        {name: 'Antigua and Barbuda', code: 'AG', IsActive : false}, 
        {name: 'Argentina', code: 'AR', IsActive : false}, 
        {name: 'Armenia', code: 'AM', IsActive : false}, 
        {name: 'Aruba', code: 'AW', IsActive : false}, 
        {name: 'Australia', code: 'AU', IsActive : false}, 
        {name: 'Austria', code: 'AT', IsActive : false}, 
        {name: 'Azerbaijan', code: 'AZ', IsActive : false}, 
        {name: 'Bahamas', code: 'BS', IsActive : false}, 
        {name: 'Bahrain', code: 'BH', IsActive : false}, 
        {name: 'Bangladesh', code: 'BD', IsActive : false}, 
        {name: 'Barbados', code: 'BB', IsActive : false}, 
        {name: 'Belarus', code: 'BY', IsActive : false}, 
        {name: 'Belgium', code: 'BE', IsActive : false}, 
        {name: 'Belize', code: 'BZ', IsActive : false}, 
        {name: 'Benin', code: 'BJ', IsActive : false}, 
        {name: 'Bermuda', code: 'BM', IsActive : false}, 
        {name: 'Bhutan', code: 'BT', IsActive : false}, 
        {name: 'Bolivia', code: 'BO', IsActive : false}, 
        {name: 'Bosnia and Herzegovina', code: 'BA', IsActive : false}, 
        {name: 'Botswana', code: 'BW', IsActive : false}, 
        {name: 'Bouvet Island', code: 'BV', IsActive : false}, 
        {name: 'Brazil', code: 'BR', IsActive : false}, 
        {name: 'British Indian Ocean Territory', code: 'IO', IsActive : false}, 
        {name: 'Brunei Darussalam', code: 'BN', IsActive : false}, 
        {name: 'Bulgaria', code: 'BG', IsActive : false}, 
        {name: 'Burkina Faso', code: 'BF', IsActive : false}, 
        {name: 'Burundi', code: 'BI', IsActive : false}, 
        {name: 'Cambodia', code: 'KH', IsActive : false}, 
        {name: 'Cameroon', code: 'CM', IsActive : false}, 
        {name: 'Canada', code: 'CA', IsActive : false}, 
        {name: 'Cape Verde', code: 'CV', IsActive : false}, 
        {name: 'Cayman Islands', code: 'KY', IsActive : false}, 
        {name: 'Central African Republic', code: 'CF', IsActive : false}, 
        {name: 'Chad', code: 'TD', IsActive : false}, 
        {name: 'Chile', code: 'CL', IsActive : false}, 
        {name: 'China', code: 'CN', IsActive : false}, 
        {name: 'Christmas Island', code: 'CX', IsActive : false}, 
        {name: 'Cocos (Keeling) Islands', code: 'CC', IsActive : false}, 
        {name: 'Colombia', code: 'CO', IsActive : false}, 
        {name: 'Comoros', code: 'KM', IsActive : false}, 
        {name: 'Congo', code: 'CG', IsActive : false}, 
        {name: 'Congo, The Democratic Republic of the', code: 'CD', IsActive : false}, 
        {name: 'Cook Islands', code: 'CK', IsActive : false}, 
        {name: 'Costa Rica', code: 'CR', IsActive : false}, 
        {name: 'Cote D\'Ivoire', code: 'CI', IsActive : false}, 
        {name: 'Croatia', code: 'HR', IsActive : false}, 
        {name: 'Cuba', code: 'CU', IsActive : false}, 
        {name: 'Cyprus', code: 'CY', IsActive : false}, 
        {name: 'Czech Republic', code: 'CZ', IsActive : false}, 
        {name: 'Denmark', code: 'DK', IsActive : false}, 
        {name: 'Djibouti', code: 'DJ', IsActive : false}, 
        {name: 'Dominica', code: 'DM', IsActive : false}, 
        {name: 'Dominican Republic', code: 'DO', IsActive : false}, 
        {name: 'Ecuador', code: 'EC', IsActive : false}, 
        {name: 'Egypt', code: 'EG', IsActive : false}, 
        {name: 'El Salvador', code: 'SV', IsActive : false}, 
        {name: 'Equatorial Guinea', code: 'GQ', IsActive : false}, 
        {name: 'Eritrea', code: 'ER', IsActive : false}, 
        {name: 'Estonia', code: 'EE', IsActive : false}, 
        {name: 'Ethiopia', code: 'ET', IsActive : false}, 
        {name: 'Falkland Islands (Malvinas)', code: 'FK', IsActive : false}, 
        {name: 'Faroe Islands', code: 'FO', IsActive : false}, 
        {name: 'Fiji', code: 'FJ', IsActive : false}, 
        {name: 'Finland', code: 'FI', IsActive : false}, 
        {name: 'France', code: 'FR', IsActive : false}, 
        {name: 'French Guiana', code: 'GF', IsActive : false}, 
        {name: 'French Polynesia', code: 'PF', IsActive : false}, 
        {name: 'French Southern Territories', code: 'TF', IsActive : false}, 
        {name: 'Gabon', code: 'GA', IsActive : false}, 
        {name: 'Gambia', code: 'GM', IsActive : false}, 
        {name: 'Georgia', code: 'GE', IsActive : false}, 
        {name: 'Germany', code: 'DE', IsActive : false}, 
        {name: 'Ghana', code: 'GH', IsActive : false}, 
        {name: 'Gibraltar', code: 'GI', IsActive : false}, 
        {name: 'Greece', code: 'GR', IsActive : false}, 
        {name: 'Greenland', code: 'GL', IsActive : false}, 
        {name: 'Grenada', code: 'GD', IsActive : false}, 
        {name: 'Guadeloupe', code: 'GP', IsActive : false}, 
        {name: 'Guam', code: 'GU', IsActive : false}, 
        {name: 'Guatemala', code: 'GT', IsActive : false}, 
        {name: 'Guernsey', code: 'GG', IsActive : false}, 
        {name: 'Guinea', code: 'GN', IsActive : false}, 
        {name: 'Guinea-Bissau', code: 'GW', IsActive : false}, 
        {name: 'Guyana', code: 'GY', IsActive : false}, 
        {name: 'Haiti', code: 'HT', IsActive : false}, 
        {name: 'Heard Island and Mcdonald Islands', code: 'HM', IsActive : false}, 
        {name: 'Holy See (Vatican City State)', code: 'VA', IsActive : false}, 
        {name: 'Honduras', code: 'HN', IsActive : false}, 
        {name: 'Hong Kong', code: 'HK', IsActive : false}, 
        {name: 'Hungary', code: 'HU', IsActive : false}, 
        {name: 'Iceland', code: 'IS', IsActive : false}, 
        {name: 'India', code: 'IN', IsActive : false}, 
        {name: 'Indonesia', code: 'ID', IsActive : false}, 
        {name: 'Iran, Islamic Republic Of', code: 'IR', IsActive : false}, 
        {name: 'Iraq', code: 'IQ', IsActive : false}, 
        {name: 'Ireland', code: 'IE', IsActive : false}, 
        {name: 'Isle of Man', code: 'IM', IsActive : false}, 
        {name: 'Israel', code: 'IL', IsActive : false}, 
        {name: 'Italy', code: 'IT', IsActive : false}, 
        {name: 'Jamaica', code: 'JM', IsActive : false}, 
        {name: 'Japan', code: 'JP', IsActive : false}, 
        {name: 'Jersey', code: 'JE', IsActive : false}, 
        {name: 'Jordan', code: 'JO', IsActive : false}, 
        {name: 'Kazakhstan', code: 'KZ', IsActive : false}, 
        {name: 'Kenya', code: 'KE', IsActive : false}, 
        {name: 'Kiribati', code: 'KI', IsActive : false}, 
        {name: 'Korea, Democratic People\'S Republic of', code: 'KP', IsActive : false}, 
        {name: 'Korea, Republic of', code: 'KR', IsActive : false}, 
        {name: 'Kuwait', code: 'KW', IsActive : false}, 
        {name: 'Kyrgyzstan', code: 'KG', IsActive : false}, 
        {name: 'Lao People\'S Democratic Republic', code: 'LA', IsActive : false}, 
        {name: 'Latvia', code: 'LV', IsActive : false}, 
        {name: 'Lebanon', code: 'LB', IsActive : false}, 
        {name: 'Lesotho', code: 'LS', IsActive : false}, 
        {name: 'Liberia', code: 'LR', IsActive : false}, 
        {name: 'Libyan Arab Jamahiriya', code: 'LY', IsActive : false}, 
        {name: 'Liechtenstein', code: 'LI', IsActive : false}, 
        {name: 'Lithuania', code: 'LT', IsActive : false}, 
        {name: 'Luxembourg', code: 'LU', IsActive : false}, 
        {name: 'Macao', code: 'MO', IsActive : false}, 
        {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK', IsActive : false}, 
        {name: 'Madagascar', code: 'MG', IsActive : false}, 
        {name: 'Malawi', code: 'MW', IsActive : false}, 
        {name: 'Malaysia', code: 'MY', IsActive : false}, 
        {name: 'Maldives', code: 'MV', IsActive : false}, 
        {name: 'Mali', code: 'ML', IsActive : false}, 
        {name: 'Malta', code: 'MT', IsActive : false}, 
        {name: 'Marshall Islands', code: 'MH', IsActive : false}, 
        {name: 'Martinique', code: 'MQ', IsActive : false}, 
        {name: 'Mauritania', code: 'MR', IsActive : false}, 
        {name: 'Mauritius', code: 'MU', IsActive : false}, 
        {name: 'Mayotte', code: 'YT', IsActive : false}, 
        {name: 'Mexico', code: 'MX', IsActive : false}, 
        {name: 'Micronesia, Federated States of', code: 'FM', IsActive : false}, 
        {name: 'Moldova, Republic of', code: 'MD', IsActive : false}, 
        {name: 'Monaco', code: 'MC', IsActive : false}, 
        {name: 'Mongolia', code: 'MN', IsActive : false}, 
        {name: 'Montserrat', code: 'MS', IsActive : false}, 
        {name: 'Morocco', code: 'MA', IsActive : false}, 
        {name: 'Mozambique', code: 'MZ', IsActive : false}, 
        {name: 'Myanmar', code: 'MM', IsActive : false}, 
        {name: 'Namibia', code: 'NA', IsActive : false}, 
        {name: 'Nauru', code: 'NR', IsActive : false}, 
        {name: 'Nepal', code: 'NP', IsActive : false}, 
        {name: 'Netherlands', code: 'NL', IsActive : false}, 
        {name: 'Netherlands Antilles', code: 'AN', IsActive : false}, 
        {name: 'New Caledonia', code: 'NC', IsActive : false}, 
        {name: 'New Zealand', code: 'NZ', IsActive : false}, 
        {name: 'Nicaragua', code: 'NI', IsActive : false}, 
        {name: 'Niger', code: 'NE', IsActive : false}, 
        {name: 'Nigeria', code: 'NG', IsActive : false}, 
        {name: 'Niue', code: 'NU', IsActive : false}, 
        {name: 'Norfolk Island', code: 'NF', IsActive : false}, 
        {name: 'Northern Mariana Islands', code: 'MP', IsActive : false}, 
        {name: 'Norway', code: 'NO', IsActive : false}, 
        {name: 'Oman', code: 'OM', IsActive : false}, 
        {name: 'Pakistan', code: 'PK', IsActive : false}, 
        {name: 'Palau', code: 'PW', IsActive : false}, 
        {name: 'Palestinian Territory, Occupied', code: 'PS', IsActive : false}, 
        {name: 'Panama', code: 'PA', IsActive : false}, 
        {name: 'Papua New Guinea', code: 'PG', IsActive : false}, 
        {name: 'Paraguay', code: 'PY', IsActive : false}, 
        {name: 'Peru', code: 'PE', IsActive : false}, 
        {name: 'Philippines', code: 'PH', IsActive : false}, 
        {name: 'Pitcairn', code: 'PN', IsActive : false}, 
        {name: 'Poland', code: 'PL', IsActive : false}, 
        {name: 'Portugal', code: 'PT', IsActive : false}, 
        {name: 'Puerto Rico', code: 'PR', IsActive : false}, 
        {name: 'Qatar', code: 'QA', IsActive : false}, 
        {name: 'Reunion', code: 'RE', IsActive : false}, 
        {name: 'Romania', code: 'RO', IsActive : false}, 
        {name: 'Russian Federation', code: 'RU', IsActive : false}, 
        {name: 'RWANDA', code: 'RW', IsActive : false}, 
        {name: 'Saint Helena', code: 'SH', IsActive : false}, 
        {name: 'Saint Kitts and Nevis', code: 'KN', IsActive : false}, 
        {name: 'Saint Lucia', code: 'LC', IsActive : false}, 
        {name: 'Saint Pierre and Miquelon', code: 'PM', IsActive : false}, 
        {name: 'Saint Vincent and the Grenadines', code: 'VC', IsActive : false}, 
        {name: 'Samoa', code: 'WS', IsActive : false}, 
        {name: 'San Marino', code: 'SM', IsActive : false}, 
        {name: 'Sao Tome and Principe', code: 'ST', IsActive : false}, 
        {name: 'Saudi Arabia', code: 'SA', IsActive : false}, 
        {name: 'Senegal', code: 'SN', IsActive : false}, 
        {name: 'Serbia and Montenegro', code: 'CS', IsActive : false}, 
        {name: 'Seychelles', code: 'SC', IsActive : false}, 
        {name: 'Sierra Leone', code: 'SL', IsActive : false}, 
        {name: 'Singapore', code: 'SG', IsActive : false}, 
        {name: 'Slovakia', code: 'SK', IsActive : false}, 
        {name: 'Slovenia', code: 'SI', IsActive : false}, 
        {name: 'Solomon Islands', code: 'SB', IsActive : false}, 
        {name: 'Somalia', code: 'SO', IsActive : false}, 
        {name: 'South Africa', code: 'ZA', IsActive : false}, 
        {name: 'South Georgia and the South Sandwich Islands', code: 'GS', IsActive : false}, 
        {name: 'Spain', code: 'ES', IsActive : false}, 
        {name: 'Sri Lanka', code: 'LK', IsActive : false}, 
        {name: 'Sudan', code: 'SD', IsActive : false}, 
        {name: 'Suriname', code: 'SR', IsActive : false}, 
        {name: 'Svalbard and Jan Mayen', code: 'SJ', IsActive : false}, 
        {name: 'Swaziland', code: 'SZ', IsActive : false}, 
        {name: 'Sweden', code: 'SE', IsActive : false}, 
        {name: 'Switzerland', code: 'CH', IsActive : false}, 
        {name: 'Syrian Arab Republic', code: 'SY', IsActive : false}, 
        {name: 'Taiwan, Province of China', code: 'TW', IsActive : false}, 
        {name: 'Tajikistan', code: 'TJ', IsActive : false}, 
        {name: 'Tanzania, United Republic of', code: 'TZ', IsActive : false}, 
        {name: 'Thailand', code: 'TH', IsActive : false}, 
        {name: 'Timor-Leste', code: 'TL', IsActive : false}, 
        {name: 'Togo', code: 'TG', IsActive : false}, 
        {name: 'Tokelau', code: 'TK', IsActive : false}, 
        {name: 'Tonga', code: 'TO', IsActive : false}, 
        {name: 'Trinidad and Tobago', code: 'TT', IsActive : false}, 
        {name: 'Tunisia', code: 'TN', IsActive : false}, 
        {name: 'Turkey', code: 'TR', IsActive : false}, 
        {name: 'Turkmenistan', code: 'TM', IsActive : false}, 
        {name: 'Turks and Caicos Islands', code: 'TC', IsActive : false}, 
        {name: 'Tuvalu', code: 'TV', IsActive : false}, 
        {name: 'Uganda', code: 'UG', IsActive : false}, 
        {name: 'Ukraine', code: 'UA', IsActive : false}, 
        {name: 'United Arab Emirates', code: 'AE', IsActive : false}, 
        {name: 'United Kingdom', code: 'GB', IsActive : false}, 
        {name: 'United States', code: 'US', IsActive : false}, 
        {name: 'United States Minor Outlying Islands', code: 'UM', IsActive : false}, 
        {name: 'Uruguay', code: 'UY', IsActive : false}, 
        {name: 'Uzbekistan', code: 'UZ', IsActive : false}, 
        {name: 'Vanuatu', code: 'VU', IsActive : false}, 
        {name: 'Venezuela', code: 'VE', IsActive : false}, 
        {name: 'Viet Nam', code: 'VN', IsActive : false}, 
        {name: 'Virgin Islands, British', code: 'VG', IsActive : false}, 
        {name: 'Virgin Islands, U.S.', code: 'VI', IsActive : false}, 
        {name: 'Wallis and Futuna', code: 'WF', IsActive : false}, 
        {name: 'Western Sahara', code: 'EH', IsActive : false}, 
        {name: 'Yemen', code: 'YE', IsActive : false}, 
        {name: 'Zambia', code: 'ZM', IsActive : false}, 
        {name: 'Zimbabwe', code: 'ZW', IsActive : false} 
      ]
     
}