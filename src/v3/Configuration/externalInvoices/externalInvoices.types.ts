import { RecurlyAccountMini } from '@/v3/Customers/accounts/accounts.types'
import { RecurlyExternalSubscription } from '@/v3/Configuration/externalSubscription/externalSubscription.types'

// External Invoice State enum
export type RecurlyExternalInvoiceState = 'paid'

// External Product Reference Mini interface
export interface RecurlyExternalProductReferenceMini {
	id?: string
	object?: string
	reference_code?: string
	external_connection_type?: string
}

// External Payment Phase Base interface
export interface RecurlyExternalPaymentPhaseBase {
	started_at?: string
	ends_at?: string
	starting_billing_period_index?: number
	ending_billing_period_index?: number
	offer_type?: string
}

// External Charge interface
export interface RecurlyExternalCharge {
	id?: string
	object?: string
	account?: RecurlyAccountMini
	currency?: string
	unit_amount?: string
	quantity?: number
	description?: string
	external_product_reference?: RecurlyExternalProductReferenceMini
	created_at?: string
	updated_at?: string
}

// Main External Invoice interface
export interface RecurlyExternalInvoice {
	id?: string
	object?: string
	account?: RecurlyAccountMini
	external_subscription?: RecurlyExternalSubscription
	external_id?: string
	state?: RecurlyExternalInvoiceState
	total?: string
	currency?: string
	line_items?: RecurlyExternalCharge[]
	purchased_at?: string
	created_at?: string
	updated_at?: string
}

// External Invoice List Response
export interface RecurlyExternalInvoiceListResponse {
	object?: string
	has_more?: boolean
	next?: string
	data?: RecurlyExternalInvoice[]
}
