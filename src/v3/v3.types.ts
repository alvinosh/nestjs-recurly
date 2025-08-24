export interface RecurlyCurrency {
	currency: string
	discount: number
}

// Custom Field interface
export interface RecurlyCustomField {
	name: string
	value: string | null
}

// Address interface
export interface RecurlyAddress {
	phone?: string
	street1?: string
	street2?: string
	city?: string
	region?: string
	postal_code?: string
	country?: string
	geo_code?: string
}

// Address with Name interface
export interface RecurlyAddressWithName extends RecurlyAddress {
	first_name?: string
	last_name?: string
	company?: string
}

export type RecurlyAccountType = 'checking' | 'savings'

export type RecurlyBankAccountPaymentType = 'bacs' | 'becs'

export type RecurlyBillingTransactionType = 'moto'

export type RecurlyPreferredLocale =
	| 'da-DK'
	| 'de-CH'
	| 'de-DE'
	| 'en-AU'
	| 'en-CA'
	| 'en-GB'
	| 'en-IE'
	| 'en-NZ'
	| 'en-US'
	| 'es-ES'
	| 'es-MX'
	| 'es-US'
	| 'fi-FI'
	| 'fr-BE'
	| 'fr-CA'
	| 'fr-CH'
	| 'fr-FR'
	| 'hi-IN'
	| 'it-IT'
	| 'ja-JP'
	| 'ko-KR'
	| 'nl-BE'
	| 'nl-NL'
	| 'pl-PL'
	| 'pt-BR'
	| 'pt-PT'
	| 'ro-RO'
	| 'ru-RU'
	| 'sk-SK'
	| 'sv-SE'
	| 'tr-TR'
	| 'zh-CN'

export type RecurlyBillTo = 'parent' | 'self'

export type RecurlyTaxIdentifierType = 'cpf' | 'other'

export type RecurlyExternalHppType = 'adyen'

export type RecurlyOnlineBankingPaymentType = 'ideal'

export type RecurlyCardType = 'American Express' | 'Visa' | 'MasterCard' | 'Discover' | 'other'

export type RecurlyCardNetworkPreference = 'Bancontact' | 'other'

export type RecurlyBankAccountType = 'bacs' | 'checking' | 'savings'

export type RecurlyAcquisitionChannel = 'advertising' | 'social_media' | 'email' | 'blog' | 'other'
