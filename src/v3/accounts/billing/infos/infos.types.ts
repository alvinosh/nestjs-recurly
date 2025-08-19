import { RecurlyAddress } from '../../../v3.types'

// Enums
export type RecurlyPaymentMethodObject = 'bacs' | 'becs' | 'credit_card' | 'paypal' | 'bank_account' | 'amazon' | 'roku'

export type RecurlyCardType =
	| 'American Express'
	| 'Dankort'
	| 'Diners Club'
	| 'Discover'
	| 'ELO'
	| 'Forbrugsforeningen'
	| 'Hipercard'
	| 'JCB'
	| 'Laser'
	| 'Maestro'
	| 'MasterCard'
	| 'Test Card'
	| 'Union Pay'
	| 'Unknown'
	| 'Visa'
	| 'Tarjeta Naranja'

export type RecurlyFundingSource = 'credit' | 'debit' | 'prepaid' | 'unknown'

export type RecurlyCardNetworkPreference = 'Bancontact' | 'CartesBancaires' | 'Dankort' | 'MasterCard' | 'Visa'

export type RecurlyAccountType = 'checking' | 'savings'

export type RecurlyFraudDecision = 'approve' | 'review' | 'decline' | 'escalate'

export type RecurlyBillingTransactionType = 'moto'

export type RecurlyTaxIdentifierType = 'cpf' | 'cnpj' | 'cuit'

export type RecurlyExternalHppType = 'adyen'

export type RecurlyOnlineBankingPaymentType = 'ideal' | 'sofort'

// Interfaces
export interface RecurlyPaymentMethod {
	object?: 'bacs' | 'becs' | 'credit_card' | 'paypal' | 'bank_account' | 'amazon' | 'roku'
	card_type?: RecurlyCardType
	first_six?: string
	last_four?: string
	last_two?: string
	exp_month?: number
	exp_year?: number
	funding_source?: RecurlyFundingSource
	card_network_preference?: RecurlyCardNetworkPreference
	gateway_token?: string
	gateway_code?: string
	billing_agreement_id?: string
	name_on_account?: string
	account_number?: string
	routing_number?: string
	bank_name?: string
	sort_code?: string
	type?: string
	account_type?: RecurlyAccountType
	tax_identifier?: string
	tax_identifier_type?: RecurlyTaxIdentifierType
	username?: string
	mandate_reference?: string
	iban_last_four?: string
	paypal_billing_agreement_id?: string
	roku_billing_agreement_id?: string
	amazon_billing_agreement_id?: string
	amazon_region?: string
}

export interface RecurlyFraudInfo {
	score?: number
	decision?: RecurlyFraudDecision
	risk_rules_triggered?: any
}

export interface RecurlyPaymentGatewayReference {
	token?: string
	reference_type?: 'stripe_confirmation_token' | 'upi_vpa'
}

export interface RecurlyBillingInfoUpdatedBy {
	ip?: string
	country?: string
}

export interface RecurlyBillingInfo {
	id?: string
	object?: string
	account_id?: string
	first_name?: string
	last_name?: string
	company?: string
	address?: RecurlyAddress
	vat_number?: string
	valid?: boolean
	payment_method?: RecurlyPaymentMethod
	fraud?: RecurlyFraudInfo
	primary_payment_method?: boolean
	backup_payment_method?: boolean
	payment_gateway_references?: RecurlyPaymentGatewayReference[]
	created_at?: string
	updated_at?: string
	updated_by?: RecurlyBillingInfoUpdatedBy
}

export interface RecurlyBillingInfoListResponse {
	object?: string
	has_more?: boolean
	next?: string
	data?: RecurlyBillingInfo[]
}

export interface RecurlyTransaction {
	id?: string
	object?: string
	uuid?: string
	original_transaction_id?: string
	type?: string
	origin?: string
	amount?: number
	status?: string
	success?: boolean
	backup_payment_method_used?: boolean
	refundable?: boolean
	voided_by_invoice?: any
	source?: any
	currency?: string
	created_at?: string
	updated_at?: string
	voided_at?: string
	collected_at?: string
	gateway_approval_code?: string
	gateway_message?: string
	gateway_reference?: string
	gateway_response_code?: string
	gateway_response_time?: number
	gateway_response_values?: any
	cvv_check?: string
	avs_check?: string
	customer_message?: string
	customer_message_locale?: string
	payment_method?: RecurlyPaymentMethod
	gateway_code?: string
	status_code?: string
	status_message?: string
}
