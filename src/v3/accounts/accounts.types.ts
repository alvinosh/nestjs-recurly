import { RecurlyAddress, RecurlyCustomField } from '../v3.types'
import { RecurlyBillingInfo } from './billing/info/info.types'

// Enums
export type RecurlyAccountState = 'active' | 'inactive' | 'closed' | 'subscriber'

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

export type RecurlyTransactionType = 'moto'

export type RecurlyTaxIdentifierType = 'cpf' | 'other'

export type RecurlyExternalHppType = 'adyen'

export type RecurlyOnlineBankingPaymentType = 'ideal'

export type RecurlyCardType = 'American Express' | 'Visa' | 'MasterCard' | 'Discover' | 'other'

export type RecurlyCardNetworkPreference = 'Bancontact' | 'other'

export type RecurlyBankAccountType = 'bacs' | 'checking' | 'savings'

export type RecurlyAcquisitionChannel = 'advertising' | 'social_media' | 'email' | 'blog' | 'other'

// Account Acquisition interface
export interface RecurlyAccountAcquisition {
	cost?: {
		amount?: number
		currency?: string
	}
	channel?: RecurlyAcquisitionChannel
	subchannel?: string
	campaign?: string
	acquired_at?: string // ISO 8601 date-time
}

// External Account interface
export interface RecurlyExternalAccount {
	external_account_code?: string
	external_connection_type?: string
}

// Shipping Address interface
export interface RecurlyShippingAddress {
	id?: string
	object?: string
	account_id?: string
	nickname?: string
	first_name?: string
	last_name?: string
	company?: string
	phone?: string
	email?: string
	vat_number?: string
	street1?: string
	street2?: string
	city?: string
	region?: string
	postal_code?: string
	country?: string
	geo_code?: string
	created_at?: string
	updated_at?: string
}

// Payment Method interface
export interface RecurlyPaymentMethod {
	object?: string
	card_type?: RecurlyCardType
	first_six?: string
	last_four?: string
	exp_month?: number
	exp_year?: number
	gateway_token?: string
	gateway_code?: string
	billing_agreement_id?: string
	name_on_account?: string
	account_type?: RecurlyBankAccountType
	routing_number?: string
	routing_number_bank?: string
	cc_bin_country?: string
}

// Fraud info interface
export interface RecurlyFraudInfo {
	score?: number
	decision?: string
	reference?: string
	risk_rules_triggered?: any[]
}

// Payment Gateway Reference interface
export interface RecurlyPaymentGatewayReference {
	id?: string
	object?: string
	reference?: string
	reference_type?: string
}

// Gateway Attributes interface
export interface RecurlyGatewayAttributes {
	[key: string]: any
}

// Main Account interface
export interface RecurlyAccount {
	id?: string
	object?: string
	state?: RecurlyAccountState
	hosted_login_token?: string
	shipping_addresses?: RecurlyShippingAddress[]
	has_live_subscription?: boolean
	has_active_subscription?: boolean
	has_future_subscription?: boolean
	has_canceled_subscription?: boolean
	has_paused_subscription?: boolean
	has_past_due_invoice?: boolean
	created_at?: string
	updated_at?: string
	deleted_at?: string
	code?: string
	username?: string
	email?: string
	override_business_entity_id?: string
	preferred_locale?: RecurlyPreferredLocale
	preferred_time_zone?: string
	cc_emails?: string
	first_name?: string
	last_name?: string
	company?: string
	vat_number?: string
	tax_exempt?: boolean
	exemption_certificate?: string
	external_accounts?: RecurlyExternalAccount[]
	parent_account_id?: string
	bill_to?: RecurlyBillTo
	dunning_campaign_id?: string
	invoice_template_id?: string
	address?: RecurlyAddress
	billing_info?: RecurlyBillingInfo
	custom_fields?: RecurlyCustomField[]
	entity_use_code?: string
}

// Account Balance interfaces
export interface RecurlyAccountBalanceAmount {
	currency?: string
	amount?: number
}

export interface RecurlyAccountBalanceInfo {
	id?: string
	object?: string
	code?: string
	email?: string
	first_name?: string
	last_name?: string
	company?: string
	parent_account_id?: string
	bill_to?: string
	dunning_campaign_id?: string
}

export interface RecurlyAccountBalance {
	object?: string
	account?: RecurlyAccountBalanceInfo
	past_due?: boolean
	balances?: RecurlyAccountBalanceAmount[]
}

// List response interfaces
export interface RecurlyAccountListResponse {
	object: string
	has_more: boolean
	next?: string
	data: RecurlyAccount[]
}

export interface RecurlyAccountBalanceListResponse {
	object: string
	has_more: boolean
	next?: string
	data: RecurlyAccountBalance[]
}

// External Subscription interface
export interface RecurlyExternalSubscription {
	id?: string
	object?: string
	account?: {
		id?: string
		object?: string
		code?: string
	}
	external_subscription_id?: string
	external_product_reference?: {
		id?: string
		object?: string
		reference_code?: string
		external_connection_type?: string
	}
	last_purchased?: string
	auto_renew?: boolean
	in_grace_period?: boolean
	app_identifier?: string
	quantity?: number
	external_id?: string
	activated_at?: string
	canceled_at?: string
	expires_at?: string
	created_at?: string
	updated_at?: string
	trial_started_at?: string
	trial_ends_at?: string
	imported_trial?: boolean
	state?: string
}

export interface RecurlyExternalSubscriptionListResponse {
	object: string
	has_more: boolean
	next?: string
	data: RecurlyExternalSubscription[]
}

// Account Mini interface
export interface RecurlyAccountMini {
	id: string
	object: string
	code?: string
	email?: string
	first_name?: string
	last_name?: string
	company?: string
	parent_account_id?: string
	bill_to?: string
	dunning_campaign_id?: string
}
