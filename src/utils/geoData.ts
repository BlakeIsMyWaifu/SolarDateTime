import { env } from '~/env.mjs'

const geoAPI = async <T>(params: URLSearchParams, endpoint: string): Promise<T> => {
	params.set('username', env.GEONAME)
	const url = `http://api.geonames.org/${endpoint}?${params.toString()}`
	const data = await fetch(url)
	if (!data.ok) throw new Error(data.statusText)
	return data.json() as Promise<T>
}

interface SearchReturn {
	totalResultsCount: number;
	geonames: GeonamesData[];
}

export interface GeonamesData {
	adminCode1: string;
	/** Longitude */
	lng: string;
	geonameId: number;
	toponymName: string;
	countryId: string;
	fcl: string;
	population: number;
	countryCode: string;
	name: string;
	fclName: string;
	adminCodes1: {
		ISO3166_2: string;
	};
	countryName: string;
	fcodeName: string;
	adminName1: string;
	/** Latitude */
	lat: string;
	fcode: string;
}

interface SearchOptions {
	maxRows: number;
	countryCode: string;
}

export const searchLocation = async (location: string, options?: Partial<SearchOptions>) => {
	const params = new URLSearchParams()
	params.set('q', location)
	if (options?.maxRows) {
		params.set('maxRows', options.maxRows.toString())
	}
	if (options?.countryCode) {
		params.set('country', options.countryCode)
	}
	const data = await geoAPI<SearchReturn>(params, 'searchJSON')
	return data
}

export const getLocationCords = async (location: string | [number, number]) => {
	const locationData = typeof location === 'string' ? await searchLocation(location) : { geonames: [{ lng: location[0], lat: location[1] }] }
	const { lng, lat } = locationData.geonames[0] ?? { lng: 0, lat: 0 }
	return {
		lng: +lng,
		lat: +lat
	}
}

export const countryCodes = {
	AD: 'Andorra',
	AE: 'United Arab Emirates',
	AF: 'Afghanistan',
	AG: 'Antigua and Barbuda',
	AI: 'Anguilla',
	AL: 'Albania',
	AM: 'Armenia',
	AO: 'Angola',
	AQ: 'Antarctica',
	AR: 'Argentina',
	AS: 'American Samoa',
	AT: 'Austria',
	AU: 'Australia',
	AW: 'Aruba',
	AX: 'Åland',
	AZ: 'Azerbaijan',
	BA: 'Bosnia and Herzegovina',
	BB: 'Barbados',
	BD: 'Bangladesh',
	BE: 'Belgium',
	BF: 'Burkina Faso',
	BG: 'Bulgaria',
	BH: 'Bahrain',
	BI: 'Burundi',
	BJ: 'Benin',
	BL: 'Saint Barthélemy',
	BM: 'Bermuda',
	BN: 'Brunei',
	BO: 'Bolivia',
	BQ: 'Bonaire, Sint Eustatius, and Saba',
	BR: 'Brazil',
	BS: 'Bahamas',
	BT: 'Bhutan',
	BV: 'Bouvet Island',
	BW: 'Botswana',
	BY: 'Belarus',
	BZ: 'Belize',
	CA: 'Canada',
	CC: 'Cocos (Keeling) Islands',
	CD: 'DR Congo',
	CF: 'Central African Republic',
	CG: 'Congo Republic',
	CH: 'Switzerland',
	CI: 'Ivory Coast',
	CK: 'Cook Islands',
	CL: 'Chile',
	CM: 'Cameroon',
	CN: 'China',
	CO: 'Colombia',
	CR: 'Costa Rica',
	CU: 'Cuba',
	CV: 'Cabo Verde',
	CW: 'Curaçao',
	CX: 'Christmas Island',
	CY: 'Cyprus',
	CZ: 'Czechia',
	DE: 'Germany',
	DJ: 'Djibouti',
	DK: 'Denmark',
	DM: 'Dominica',
	DO: 'Dominican Republic',
	DZ: 'Algeria',
	EC: 'Ecuador',
	EE: 'Estonia',
	EG: 'Egypt',
	EH: 'Western Sahara',
	ER: 'Eritrea',
	ES: 'Spain',
	ET: 'Ethiopia',
	FI: 'Finland',
	FJ: 'Fiji',
	FK: 'Falkland Islands',
	FM: 'Micronesia',
	FO: 'Faroe Islands',
	FR: 'France',
	GA: 'Gabon',
	GB: 'United Kingdom',
	GD: 'Grenada',
	GE: 'Georgia',
	GF: 'French Guiana',
	GG: 'Guernsey',
	GH: 'Ghana',
	GI: 'Gibraltar',
	GL: 'Greenland',
	GM: 'The Gambia',
	GN: 'Guinea',
	GP: 'Guadeloupe',
	GQ: 'Equatorial Guinea',
	GR: 'Greece',
	GS: 'South Georgia and South Sandwich Islands',
	GT: 'Guatemala',
	GU: 'Guam',
	GW: 'Guinea-Bissau',
	GY: 'Guyana',
	HK: 'Hong Kong',
	HM: 'Heard and McDonald Islands',
	HN: 'Honduras',
	HR: 'Croatia',
	HT: 'Haiti',
	HU: 'Hungary',
	ID: 'Indonesia',
	IE: 'Ireland',
	IL: 'Israel',
	IM: 'Isle of Man',
	IN: 'India',
	IO: 'British Indian Ocean Territory',
	IQ: 'Iraq',
	IR: 'Iran',
	IS: 'Iceland',
	IT: 'Italy',
	JE: 'Jersey',
	JM: 'Jamaica',
	JO: 'Jordan',
	JP: 'Japan',
	KE: 'Kenya',
	KG: 'Kyrgyzstan',
	KH: 'Cambodia',
	KI: 'Kiribati',
	KM: 'Comoros',
	KN: 'St Kitts and Nevis',
	KP: 'North Korea',
	KR: 'South Korea',
	KW: 'Kuwait',
	KY: 'Cayman Islands',
	KZ: 'Kazakhstan',
	LA: 'Laos',
	LB: 'Lebanon',
	LC: 'Saint Lucia',
	LI: 'Liechtenstein',
	LK: 'Sri Lanka',
	LR: 'Liberia',
	LS: 'Lesotho',
	LT: 'Lithuania',
	LU: 'Luxembourg',
	LV: 'Latvia',
	LY: 'Libya',
	MA: 'Morocco',
	MC: 'Monaco',
	MD: 'Moldova',
	ME: 'Montenegro',
	MF: 'Saint Martin',
	MG: 'Madagascar',
	MH: 'Marshall Islands',
	MK: 'North Macedonia',
	ML: 'Mali',
	MM: 'Myanmar',
	MN: 'Mongolia',
	MO: 'Macao',
	MP: 'Northern Mariana Islands',
	MQ: 'Martinique',
	MR: 'Mauritania',
	MS: 'Montserrat',
	MT: 'Malta',
	MU: 'Mauritius',
	MV: 'Maldives',
	MW: 'Malawi',
	MX: 'Mexico',
	MY: 'Malaysia',
	MZ: 'Mozambique',
	NA: 'Namibia',
	NC: 'New Caledonia',
	NE: 'Niger',
	NF: 'Norfolk Island',
	NG: 'Nigeria',
	NI: 'Nicaragua',
	NL: 'Netherlands',
	NO: 'Norway',
	NP: 'Nepal',
	NR: 'Nauru',
	NU: 'Niue',
	NZ: 'New Zealand',
	OM: 'Oman',
	PA: 'Panama',
	PE: 'Peru',
	PF: 'French Polynesia',
	PG: 'Papua New Guinea',
	PH: 'Philippines',
	PK: 'Pakistan',
	PL: 'Poland',
	PM: 'Saint Pierre and Miquelon',
	PN: 'Pitcairn Islands',
	PR: 'Puerto Rico',
	PS: 'Palestine',
	PT: 'Portugal',
	PW: 'Palau',
	PY: 'Paraguay',
	QA: 'Qatar',
	RE: 'Réunion',
	RO: 'Romania',
	RS: 'Serbia',
	RU: 'Russia',
	RW: 'Rwanda',
	SA: 'Saudi Arabia',
	SB: 'Solomon Islands',
	SC: 'Seychelles',
	SD: 'Sudan',
	SE: 'Sweden',
	SG: 'Singapore',
	SH: 'Saint Helena',
	SI: 'Slovenia',
	SJ: 'Svalbard and Jan Mayen',
	SK: 'Slovakia',
	SL: 'Sierra Leone',
	SM: 'San Marino',
	SN: 'Senegal',
	SO: 'Somalia',
	SR: 'Suriname',
	SS: 'South Sudan',
	ST: 'São Tomé and Príncipe',
	SV: 'El Salvador',
	SX: 'Sint Maarten',
	SY: 'Syria',
	SZ: 'Eswatini',
	TC: 'Turks and Caicos Islands',
	TD: 'Chad',
	TF: 'French Southern Territories',
	TG: 'Togo',
	TH: 'Thailand',
	TJ: 'Tajikistan',
	TK: 'Tokelau',
	TL: 'Timor-Leste',
	TM: 'Turkmenistan',
	TN: 'Tunisia',
	TO: 'Tonga',
	TR: 'Turkey',
	TT: 'Trinidad and Tobago',
	TV: 'Tuvalu',
	TW: 'Taiwan',
	TZ: 'Tanzania',
	UA: 'Ukraine',
	UG: 'Uganda',
	UM: 'U.S. Outlying Islands',
	US: 'United States',
	UY: 'Uruguay',
	UZ: 'Uzbekistan',
	VA: 'Vatican City',
	VC: 'St Vincent and Grenadines',
	VE: 'Venezuela',
	VG: 'British Virgin Islands',
	VI: 'U.S. Virgin Islands',
	VN: 'Vietnam',
	VU: 'Vanuatu',
	WF: 'Wallis and Futuna',
	WS: 'Samoa',
	XK: 'Kosovo',
	YE: 'Yemen',
	YT: 'Mayotte',
	ZA: 'South Africa',
	ZM: 'Zambia',
	ZW: 'Zimbabwe'
}
