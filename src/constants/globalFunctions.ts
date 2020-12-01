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
export const truncateTextLength = 20;

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
        {name: 'Afghanistan', code: 'AF', selected : false}, 
        {name: 'Åland Islands', code: 'AX', selected : false}, 
        {name: 'Albania', code: 'AL', selected : false}, 
        {name: 'Algeria', code: 'DZ', selected : false}, 
        {name: 'American Samoa', code: 'AS', selected : false}, 
        {name: 'AndorrA', code: 'AD', selected : false}, 
        {name: 'Angola', code: 'AO', selected : false}, 
        {name: 'Anguilla', code: 'AI', selected : false}, 
        {name: 'Antarctica', code: 'AQ', selected : false}, 
        {name: 'Antigua and Barbuda', code: 'AG', selected : false}, 
        {name: 'Argentina', code: 'AR', selected : false}, 
        {name: 'Armenia', code: 'AM', selected : false}, 
        {name: 'Aruba', code: 'AW', selected : false}, 
        {name: 'Australia', code: 'AU', selected : false}, 
        {name: 'Austria', code: 'AT', selected : false}, 
        {name: 'Azerbaijan', code: 'AZ', selected : false}, 
        {name: 'Bahamas', code: 'BS', selected : false}, 
        {name: 'Bahrain', code: 'BH', selected : false}, 
        {name: 'Bangladesh', code: 'BD', selected : false}, 
        {name: 'Barbados', code: 'BB', selected : false}, 
        {name: 'Belarus', code: 'BY', selected : false}, 
        {name: 'Belgium', code: 'BE', selected : false}, 
        {name: 'Belize', code: 'BZ', selected : false}, 
        {name: 'Benin', code: 'BJ', selected : false}, 
        {name: 'Bermuda', code: 'BM', selected : false}, 
        {name: 'Bhutan', code: 'BT', selected : false}, 
        {name: 'Bolivia', code: 'BO', selected : false}, 
        {name: 'Bosnia and Herzegovina', code: 'BA', selected : false}, 
        {name: 'Botswana', code: 'BW', selected : false}, 
        {name: 'Bouvet Island', code: 'BV', selected : false}, 
        {name: 'Brazil', code: 'BR', selected : false}, 
        {name: 'British Indian Ocean Territory', code: 'IO', selected : false}, 
        {name: 'Brunei Darussalam', code: 'BN', selected : false}, 
        {name: 'Bulgaria', code: 'BG', selected : false}, 
        {name: 'Burkina Faso', code: 'BF', selected : false}, 
        {name: 'Burundi', code: 'BI', selected : false}, 
        {name: 'Cambodia', code: 'KH', selected : false}, 
        {name: 'Cameroon', code: 'CM', selected : false}, 
        {name: 'Canada', code: 'CA', selected : false}, 
        {name: 'Cape Verde', code: 'CV', selected : false}, 
        {name: 'Cayman Islands', code: 'KY', selected : false}, 
        {name: 'Central African Republic', code: 'CF', selected : false}, 
        {name: 'Chad', code: 'TD', selected : false}, 
        {name: 'Chile', code: 'CL', selected : false}, 
        {name: 'China', code: 'CN', selected : false}, 
        {name: 'Christmas Island', code: 'CX', selected : false}, 
        {name: 'Cocos (Keeling) Islands', code: 'CC', selected : false}, 
        {name: 'Colombia', code: 'CO', selected : false}, 
        {name: 'Comoros', code: 'KM', selected : false}, 
        {name: 'Congo', code: 'CG', selected : false}, 
        {name: 'Congo, The Democratic Republic of the', code: 'CD', selected : false}, 
        {name: 'Cook Islands', code: 'CK', selected : false}, 
        {name: 'Costa Rica', code: 'CR', selected : false}, 
        {name: 'Cote D\'Ivoire', code: 'CI', selected : false}, 
        {name: 'Croatia', code: 'HR', selected : false}, 
        {name: 'Cuba', code: 'CU', selected : false}, 
        {name: 'Cyprus', code: 'CY', selected : false}, 
        {name: 'Czech Republic', code: 'CZ', selected : false}, 
        {name: 'Denmark', code: 'DK', selected : false}, 
        {name: 'Djibouti', code: 'DJ', selected : false}, 
        {name: 'Dominica', code: 'DM', selected : false}, 
        {name: 'Dominican Republic', code: 'DO', selected : false}, 
        {name: 'Ecuador', code: 'EC', selected : false}, 
        {name: 'Egypt', code: 'EG', selected : false}, 
        {name: 'El Salvador', code: 'SV', selected : false}, 
        {name: 'Equatorial Guinea', code: 'GQ', selected : false}, 
        {name: 'Eritrea', code: 'ER', selected : false}, 
        {name: 'Estonia', code: 'EE', selected : false}, 
        {name: 'Ethiopia', code: 'ET', selected : false}, 
        {name: 'Falkland Islands (Malvinas)', code: 'FK', selected : false}, 
        {name: 'Faroe Islands', code: 'FO', selected : false}, 
        {name: 'Fiji', code: 'FJ', selected : false}, 
        {name: 'Finland', code: 'FI', selected : false}, 
        {name: 'France', code: 'FR', selected : false}, 
        {name: 'French Guiana', code: 'GF', selected : false}, 
        {name: 'French Polynesia', code: 'PF', selected : false}, 
        {name: 'French Southern Territories', code: 'TF', selected : false}, 
        {name: 'Gabon', code: 'GA', selected : false}, 
        {name: 'Gambia', code: 'GM', selected : false}, 
        {name: 'Georgia', code: 'GE', selected : false}, 
        {name: 'Germany', code: 'DE', selected : false}, 
        {name: 'Ghana', code: 'GH', selected : false}, 
        {name: 'Gibraltar', code: 'GI', selected : false}, 
        {name: 'Greece', code: 'GR', selected : false}, 
        {name: 'Greenland', code: 'GL', selected : false}, 
        {name: 'Grenada', code: 'GD', selected : false}, 
        {name: 'Guadeloupe', code: 'GP', selected : false}, 
        {name: 'Guam', code: 'GU', selected : false}, 
        {name: 'Guatemala', code: 'GT', selected : false}, 
        {name: 'Guernsey', code: 'GG', selected : false}, 
        {name: 'Guinea', code: 'GN', selected : false}, 
        {name: 'Guinea-Bissau', code: 'GW', selected : false}, 
        {name: 'Guyana', code: 'GY', selected : false}, 
        {name: 'Haiti', code: 'HT', selected : false}, 
        {name: 'Heard Island and Mcdonald Islands', code: 'HM', selected : false}, 
        {name: 'Holy See (Vatican City State)', code: 'VA', selected : false}, 
        {name: 'Honduras', code: 'HN', selected : false}, 
        {name: 'Hong Kong', code: 'HK', selected : false}, 
        {name: 'Hungary', code: 'HU', selected : false}, 
        {name: 'Iceland', code: 'IS', selected : false}, 
        {name: 'India', code: 'IN', selected : false}, 
        {name: 'Indonesia', code: 'ID', selected : false}, 
        {name: 'Iran, Islamic Republic Of', code: 'IR', selected : false}, 
        {name: 'Iraq', code: 'IQ', selected : false}, 
        {name: 'Ireland', code: 'IE', selected : false}, 
        {name: 'Isle of Man', code: 'IM', selected : false}, 
        {name: 'Israel', code: 'IL', selected : false}, 
        {name: 'Italy', code: 'IT', selected : false}, 
        {name: 'Jamaica', code: 'JM', selected : false}, 
        {name: 'Japan', code: 'JP', selected : false}, 
        {name: 'Jersey', code: 'JE', selected : false}, 
        {name: 'Jordan', code: 'JO', selected : false}, 
        {name: 'Kazakhstan', code: 'KZ', selected : false}, 
        {name: 'Kenya', code: 'KE', selected : false}, 
        {name: 'Kiribati', code: 'KI', selected : false}, 
        {name: 'Korea, Democratic People\'S Republic of', code: 'KP', selected : false}, 
        {name: 'Korea, Republic of', code: 'KR', selected : false}, 
        {name: 'Kuwait', code: 'KW', selected : false}, 
        {name: 'Kyrgyzstan', code: 'KG', selected : false}, 
        {name: 'Lao People\'S Democratic Republic', code: 'LA', selected : false}, 
        {name: 'Latvia', code: 'LV', selected : false}, 
        {name: 'Lebanon', code: 'LB', selected : false}, 
        {name: 'Lesotho', code: 'LS', selected : false}, 
        {name: 'Liberia', code: 'LR', selected : false}, 
        {name: 'Libyan Arab Jamahiriya', code: 'LY', selected : false}, 
        {name: 'Liechtenstein', code: 'LI', selected : false}, 
        {name: 'Lithuania', code: 'LT', selected : false}, 
        {name: 'Luxembourg', code: 'LU', selected : false}, 
        {name: 'Macao', code: 'MO', selected : false}, 
        {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK', selected : false}, 
        {name: 'Madagascar', code: 'MG', selected : false}, 
        {name: 'Malawi', code: 'MW', selected : false}, 
        {name: 'Malaysia', code: 'MY', selected : false}, 
        {name: 'Maldives', code: 'MV', selected : false}, 
        {name: 'Mali', code: 'ML', selected : false}, 
        {name: 'Malta', code: 'MT', selected : false}, 
        {name: 'Marshall Islands', code: 'MH', selected : false}, 
        {name: 'Martinique', code: 'MQ', selected : false}, 
        {name: 'Mauritania', code: 'MR', selected : false}, 
        {name: 'Mauritius', code: 'MU', selected : false}, 
        {name: 'Mayotte', code: 'YT', selected : false}, 
        {name: 'Mexico', code: 'MX', selected : false}, 
        {name: 'Micronesia, Federated States of', code: 'FM', selected : false}, 
        {name: 'Moldova, Republic of', code: 'MD', selected : false}, 
        {name: 'Monaco', code: 'MC', selected : false}, 
        {name: 'Mongolia', code: 'MN', selected : false}, 
        {name: 'Montserrat', code: 'MS', selected : false}, 
        {name: 'Morocco', code: 'MA', selected : false}, 
        {name: 'Mozambique', code: 'MZ', selected : false}, 
        {name: 'Myanmar', code: 'MM', selected : false}, 
        {name: 'Namibia', code: 'NA', selected : false}, 
        {name: 'Nauru', code: 'NR', selected : false}, 
        {name: 'Nepal', code: 'NP', selected : false}, 
        {name: 'Netherlands', code: 'NL', selected : false}, 
        {name: 'Netherlands Antilles', code: 'AN', selected : false}, 
        {name: 'New Caledonia', code: 'NC', selected : false}, 
        {name: 'New Zealand', code: 'NZ', selected : false}, 
        {name: 'Nicaragua', code: 'NI', selected : false}, 
        {name: 'Niger', code: 'NE', selected : false}, 
        {name: 'Nigeria', code: 'NG', selected : false}, 
        {name: 'Niue', code: 'NU', selected : false}, 
        {name: 'Norfolk Island', code: 'NF', selected : false}, 
        {name: 'Northern Mariana Islands', code: 'MP', selected : false}, 
        {name: 'Norway', code: 'NO', selected : false}, 
        {name: 'Oman', code: 'OM', selected : false}, 
        {name: 'Pakistan', code: 'PK', selected : false}, 
        {name: 'Palau', code: 'PW', selected : false}, 
        {name: 'Palestinian Territory, Occupied', code: 'PS', selected : false}, 
        {name: 'Panama', code: 'PA', selected : false}, 
        {name: 'Papua New Guinea', code: 'PG', selected : false}, 
        {name: 'Paraguay', code: 'PY', selected : false}, 
        {name: 'Peru', code: 'PE', selected : false}, 
        {name: 'Philippines', code: 'PH', selected : false}, 
        {name: 'Pitcairn', code: 'PN', selected : false}, 
        {name: 'Poland', code: 'PL', selected : false}, 
        {name: 'Portugal', code: 'PT', selected : false}, 
        {name: 'Puerto Rico', code: 'PR', selected : false}, 
        {name: 'Qatar', code: 'QA', selected : false}, 
        {name: 'Reunion', code: 'RE', selected : false}, 
        {name: 'Romania', code: 'RO', selected : false}, 
        {name: 'Russian Federation', code: 'RU', selected : false}, 
        {name: 'RWANDA', code: 'RW', selected : false}, 
        {name: 'Saint Helena', code: 'SH', selected : false}, 
        {name: 'Saint Kitts and Nevis', code: 'KN', selected : false}, 
        {name: 'Saint Lucia', code: 'LC', selected : false}, 
        {name: 'Saint Pierre and Miquelon', code: 'PM', selected : false}, 
        {name: 'Saint Vincent and the Grenadines', code: 'VC', selected : false}, 
        {name: 'Samoa', code: 'WS', selected : false}, 
        {name: 'San Marino', code: 'SM', selected : false}, 
        {name: 'Sao Tome and Principe', code: 'ST', selected : false}, 
        {name: 'Saudi Arabia', code: 'SA', selected : false}, 
        {name: 'Senegal', code: 'SN', selected : false}, 
        {name: 'Serbia and Montenegro', code: 'CS', selected : false}, 
        {name: 'Seychelles', code: 'SC', selected : false}, 
        {name: 'Sierra Leone', code: 'SL', selected : false}, 
        {name: 'Singapore', code: 'SG', selected : false}, 
        {name: 'Slovakia', code: 'SK', selected : false}, 
        {name: 'Slovenia', code: 'SI', selected : false}, 
        {name: 'Solomon Islands', code: 'SB', selected : false}, 
        {name: 'Somalia', code: 'SO', selected : false}, 
        {name: 'South Africa', code: 'ZA', selected : false}, 
        {name: 'South Georgia and the South Sandwich Islands', code: 'GS', selected : false}, 
        {name: 'Spain', code: 'ES', selected : false}, 
        {name: 'Sri Lanka', code: 'LK', selected : false}, 
        {name: 'Sudan', code: 'SD', selected : false}, 
        {name: 'Suriname', code: 'SR', selected : false}, 
        {name: 'Svalbard and Jan Mayen', code: 'SJ', selected : false}, 
        {name: 'Swaziland', code: 'SZ', selected : false}, 
        {name: 'Sweden', code: 'SE', selected : false}, 
        {name: 'Switzerland', code: 'CH', selected : false}, 
        {name: 'Syrian Arab Republic', code: 'SY', selected : false}, 
        {name: 'Taiwan, Province of China', code: 'TW', selected : false}, 
        {name: 'Tajikistan', code: 'TJ', selected : false}, 
        {name: 'Tanzania, United Republic of', code: 'TZ', selected : false}, 
        {name: 'Thailand', code: 'TH', selected : false}, 
        {name: 'Timor-Leste', code: 'TL', selected : false}, 
        {name: 'Togo', code: 'TG', selected : false}, 
        {name: 'Tokelau', code: 'TK', selected : false}, 
        {name: 'Tonga', code: 'TO', selected : false}, 
        {name: 'Trinidad and Tobago', code: 'TT', selected : false}, 
        {name: 'Tunisia', code: 'TN', selected : false}, 
        {name: 'Turkey', code: 'TR', selected : false}, 
        {name: 'Turkmenistan', code: 'TM', selected : false}, 
        {name: 'Turks and Caicos Islands', code: 'TC', selected : false}, 
        {name: 'Tuvalu', code: 'TV', selected : false}, 
        {name: 'Uganda', code: 'UG', selected : false}, 
        {name: 'Ukraine', code: 'UA', selected : false}, 
        {name: 'United Arab Emirates', code: 'AE', selected : false}, 
        {name: 'United Kingdom', code: 'GB', selected : false}, 
        {name: 'United States', code: 'US', selected : false}, 
        {name: 'United States Minor Outlying Islands', code: 'UM', selected : false}, 
        {name: 'Uruguay', code: 'UY', selected : false}, 
        {name: 'Uzbekistan', code: 'UZ', selected : false}, 
        {name: 'Vanuatu', code: 'VU', selected : false}, 
        {name: 'Venezuela', code: 'VE', selected : false}, 
        {name: 'Viet Nam', code: 'VN', selected : false}, 
        {name: 'Virgin Islands, British', code: 'VG', selected : false}, 
        {name: 'Virgin Islands, U.S.', code: 'VI', selected : false}, 
        {name: 'Wallis and Futuna', code: 'WF', selected : false}, 
        {name: 'Western Sahara', code: 'EH', selected : false}, 
        {name: 'Yemen', code: 'YE', selected : false}, 
        {name: 'Zambia', code: 'ZM', selected : false}, 
        {name: 'Zimbabwe', code: 'ZW', selected : false} 
      ]
     
}