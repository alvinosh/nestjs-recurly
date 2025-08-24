import { RecurlyAccountMini } from '@/v3/Customers/accounts/accounts.types'

// External Subscription State enum
export type RecurlyExternalSubscriptionState =
	| 'active'
	| 'canceled'
	| 'expired'
	| 'past_due'
	| 'voided'
	| 'revoked'
	| 'paused'

// External Product Reference Mini interface
export interface RecurlyExternalProductReferenceMini {
	id?: string
	object?: string
	reference_code?: string
	external_connection_type?: string
}

// External Payment Phase interface
export interface RecurlyExternalPaymentPhase {
	id?: string
	object?: string
	amount?: string
	currency?: string
	period_unit?: string
	period_length?: number
	type?: string
	started_at?: string
	ends_at?: string
	created_at?: string
	updated_at?: string
}

// Main External Subscription interface
export interface RecurlyExternalSubscription {
	id?: string
	object?: string
	account?: RecurlyAccountMini
	external_product_reference?: RecurlyExternalProductReferenceMini
	external_payment_phases?: RecurlyExternalPaymentPhase[]
	external_id?: string
	uuid?: string
	last_purchased?: string
	auto_renew?: boolean
	in_grace_period?: boolean
	app_identifier?: string
	quantity?: number
	state?: RecurlyExternalSubscriptionState
	activated_at?: string
	canceled_at?: string
	expires_at?: string
	trial_started_at?: string
	trial_ends_at?: string
	test?: boolean
	imported?: boolean
	created_at?: string
	updated_at?: string
}

// External Subscription List Response
export interface RecurlyExternalSubscriptionListResponse {
	object?: string
	has_more?: boolean
	next?: string
	data?: RecurlyExternalSubscription[]
}
