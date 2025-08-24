import { RecurlyAccountMini } from '../accounts/accounts.types'
import { RecurlyShippingAddress } from '../accounts/shippingAddress/shippingAddress.types'
import { RecurlyCreditPayment } from '../creditPayment/creditPayment.types'
import { RecurlyLineItem } from '../purchase/purchase.types'
import { RecurlyCollectionMethod, RecurlyTransaction } from '../transaction/transaction.types'
import { RecurlyAddress } from '../v3.types'

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

// Invoice Address interface
export interface RecurlyInvoiceAddress extends RecurlyAddress {
	name_on_account?: string
	company?: string
	first_name?: string
	last_name?: string
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
