import { RecurlySubscription } from '@/v3/Customers/subscription/subscription.types'

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
export interface RecurlyExternalSubscription extends RecurlySubscription {}

// External Subscription List Response
export interface RecurlyExternalSubscriptionListResponse {
	object?: string
	has_more?: boolean
	next?: string
	data?: RecurlyExternalSubscription[]
}
