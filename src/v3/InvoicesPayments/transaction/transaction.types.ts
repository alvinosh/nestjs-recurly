import { RecurlyAccountMini } from '@/v3/Customers/accounts/accounts.types'

// Enums
export type RecurlyTransactionType = 'authorization' | 'capture' | 'purchase' | 'refund' | 'verify'

export type RecurlyTransactionOrigin =
	| 'api'
	| 'chargeback'
	| 'external_recovery'
	| 'force_collect'
	| 'hpp'
	| 'merchant'
	| 'recurly_admin'
	| 'recurlyjs'
	| 'recurring'
	| 'refunded_externally'
	| 'transparent'
	| 'token_api'
	| 'api_force_collect'
	| 'api_sub_change'
	| 'api_verify_card'
	| 'refund_balance'
	| 'amazon_v2_ipn'

export type RecurlyTransactionStatus =
	| 'chargeback'
	| 'declined'
	| 'error'
	| 'pending'
	| 'processing'
	| 'scheduled'
	| 'success'
	| 'void'

export type RecurlyTransactionInitiator = 'customer' | 'merchant'

export type RecurlyMerchantReasonCode =
	| 'incremental'
	| 'no_show'
	| 'resubmission'
	| 'service_extension'
	| 'split_shipment'
	| 'top_up'

export type RecurlyCollectionMethod = 'automatic' | 'manual'

export type RecurlyCvvCheck = 'D' | 'I' | 'M' | 'N' | 'P' | 'S' | 'U' | 'X'

export type RecurlyAvsCheck =
	| 'A'
	| 'B'
	| 'C'
	| 'D'
	| 'E'
	| 'F'
	| 'G'
	| 'H'
	| 'I'
	| 'J'
	| 'K'
	| 'L'
	| 'M'
	| 'N'
	| 'O'
	| 'P'
	| 'Q'
	| 'R'
	| 'S'
	| 'T'
	| 'U'
	| 'V'
	| 'W'
	| 'X'
	| 'Y'
	| 'Z'

export type RecurlyFraudDecision = 'approve' | 'decline' | 'escalate' | 'review'

// Invoice Mini interface (reference to invoice)
export interface RecurlyInvoiceMini {
	id?: string
	object?: string
	number?: string
	type?: string
	state?: string
}

// Address with Name interface
export interface RecurlyAddressWithName {
	phone?: string
	street1?: string
	street2?: string
	city?: string
	region?: string
	postal_code?: string
	country?: string
	first_name?: string
	last_name?: string
	company?: string
}

// Payment Method interface
export interface RecurlyPaymentMethod {
	object?: string
	card_type?: string
	first_six?: string
	last_four?: string
	last_two?: string
	exp_month?: number
	exp_year?: number
	gateway_token?: string
	gateway_code?: string
	billing_agreement_id?: string
	name_on_account?: string
	account_type?: string
	routing_number?: string
	routing_number_bank?: string
}

// Transaction Payment Gateway interface
export interface RecurlyTransactionPaymentGateway {
	id?: string
	object?: string
	type?: string
	name?: string
}

// Transaction Fraud Info interface
export interface RecurlyTransactionFraudInfo {
	object?: string
	score?: number
	decision?: RecurlyFraudDecision
	reference?: string
	risk_rules_triggered?: Array<{
		code?: string
		message?: string
	}>
}

// Full Transaction interface
export interface RecurlyTransaction {
	id?: string
	object?: string
	uuid?: string
	original_transaction_id?: string
	account?: RecurlyAccountMini
	initiator?: RecurlyTransactionInitiator
	invoice?: RecurlyInvoiceMini
	merchant_reason_code?: RecurlyMerchantReasonCode
	voided_by_invoice?: RecurlyInvoiceMini
	subscription_ids?: string[]
	type?: RecurlyTransactionType
	origin?: RecurlyTransactionOrigin
	currency?: string
	amount?: number
	status?: RecurlyTransactionStatus
	success?: boolean
	backup_payment_method_used?: boolean
	refunded?: boolean
	billing_address?: RecurlyAddressWithName
	collection_method?: RecurlyCollectionMethod
	payment_method?: RecurlyPaymentMethod
	ip_address_v4?: string
	ip_address_country?: string
	status_code?: string
	status_message?: string
	customer_message?: string
	customer_message_locale?: string
	payment_gateway?: RecurlyTransactionPaymentGateway
	gateway_message?: string
	gateway_reference?: string
	gateway_approval_code?: string
	gateway_response_code?: string
	gateway_response_time?: number
	gateway_response_values?: Record<string, any>
	cvv_check?: RecurlyCvvCheck
	avs_check?: RecurlyAvsCheck
	created_at?: string
	updated_at?: string
	voided_at?: string
	collected_at?: string
	action_result?: Record<string, any>
	vat_number?: string
	fraud_info?: RecurlyTransactionFraudInfo
}

// Transaction List Response interface
export interface RecurlyTransactionListResponse {
	object: string
	has_more: boolean
	next?: string
	data: RecurlyTransaction[]
}
