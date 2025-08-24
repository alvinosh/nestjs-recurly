import { RecurlyCollectionMethod } from '../accounts/billing/info/info.types'
import { RecurlyCreditPayment, RecurlyLineItem, RecurlyTransaction } from '../purchase/purchase.types'

// Enums
export type RecurlyInvoiceType = 'charge' | 'credit' | 'legacy'

export type RecurlyInvoiceOrigin =
	| 'carryforward_credit'
	| 'carryforward_gift_credit'
	| 'credit'
	| 'external_refund'
	| 'gift_card'
	| 'immediate_change'
	| 'import'
	| 'line_item_refund'
	| 'open_amount_refund'
	| 'prepayment'
	| 'purchase'
	| 'refund'
	| 'renewal'
	| 'termination'
	| 'usage_correction'
	| 'write_off'

export type RecurlyInvoiceState =
	| 'open'
	| 'pending'
	| 'processing'
	| 'past_due'
	| 'paid'
	| 'closed'
	| 'failed'
	| 'voided'

export type RecurlyNetTermsType = 'net' | 'eom'

export type RecurlyRefundMethod = 'all_credit' | 'all_transaction' | 'credit_first' | 'transaction_first'

export type RecurlyRefundType = 'amount' | 'percentage' | 'line_items'

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

// Invoice Address interface
export interface RecurlyInvoiceAddress extends RecurlyAddress {
	name_on_account?: string
	company?: string
	first_name?: string
	last_name?: string
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

// Tax Info interface
export interface RecurlyTaxInfo {
	type?: string
	region?: string
	rate?: number
	tax_details?: Array<{
		type?: string
		region?: string
		rate?: number
		tax?: number
		name?: string
		level?: string
		billable?: boolean
	}>
}

// Shipping Address interface
export interface RecurlyShippingAddress {
	id?: string
	object?: string
	account_id?: string
	first_name?: string
	last_name?: string
	company?: string
	email?: string
	vat_number?: string
	phone?: string
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

// Reference Only Currency Conversion interface
export interface RecurlyReferenceOnlyCurrencyConversion {
	amount?: number
	rate?: number
}

// Invoice Mini interface
export interface RecurlyInvoiceMini {
	id: string
	object: string
	number?: string
	business_entity_id?: string
	type?: RecurlyInvoiceType
	state?: RecurlyInvoiceState
}

// Invoice interface
export interface RecurlyInvoice {
	id: string
	uuid: string
	object: string
	type?: RecurlyInvoiceType
	origin?: RecurlyInvoiceOrigin
	state?: RecurlyInvoiceState
	account?: RecurlyAccountMini
	billing_info_id?: string
	subscription_ids?: string[]
	previous_invoice_id?: string
	number?: string
	collection_method?: RecurlyCollectionMethod
	po_number?: string
	net_terms?: number
	net_terms_type?: RecurlyNetTermsType
	address?: RecurlyInvoiceAddress
	shipping_address?: RecurlyShippingAddress
	currency?: string
	discount?: number
	subtotal?: number
	subtotal_after_discount?: number
	tax?: number
	reference_only_currency_conversion?: RecurlyReferenceOnlyCurrencyConversion
	total?: number
	refundable_amount?: number
	paid?: number
	balance?: number
	tax_info?: RecurlyTaxInfo
	used_tax_service?: boolean
	vat_number?: string
	vat_reverse_charge_notes?: string
	terms_and_conditions?: string
	customer_notes?: string
	line_items?: RecurlyLineItem[]
	has_more_line_items?: boolean
	transactions?: RecurlyTransaction[]
	credit_payments?: RecurlyCreditPayment[]
	created_at?: string
	updated_at?: string
	due_at?: string
	closed_at?: string
	dunning_campaign_id?: string
	dunning_events_sent?: number
	final_dunning_event?: boolean
	business_entity_id?: string
}

// Invoice Collection interface
export interface RecurlyInvoiceCollection {
	object: string
	charge_invoice?: RecurlyInvoice
	credit_invoices?: RecurlyInvoice[]
}

// Invoice List Response interface
export interface RecurlyInvoiceListResponse {
	object: string
	has_more: boolean
	next?: string
	data: RecurlyInvoice[]
}

// Transaction List Response interface
export interface RecurlyTransactionListResponse {
	object: string
	has_more: boolean
	next?: string
	data: RecurlyTransaction[]
}

// Credit Payment List Response interface
export interface RecurlyCreditPaymentListResponse {
	object: string
	has_more: boolean
	next?: string
	data: RecurlyCreditPayment[]
}

// External Refund interface
export interface RecurlyExternalRefund {
	payment_method?: string
	description?: string
	refunded_at?: string
}

// Line Item Refund interface
export interface RecurlyLineItemRefund {
	id: string
	quantity?: number
	quantity_decimal?: string
	prorate?: boolean
	percentage?: number
}

// External Invoice interface
export interface RecurlyExternalInvoice {
	id: string
	object: string
	account?: RecurlyAccountMini
	subscription_ids?: string[]
	external_id?: string
	state?: string
	total?: string
	currency?: string
	line_items?: RecurlyLineItem[]
	purchased_at?: string
	created_at?: string
	updated_at?: string
}
