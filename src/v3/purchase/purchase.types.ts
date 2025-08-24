import { RecurlyAccountMini } from '../accounts/accounts.types'
import { RecurlyShippingAddress } from '../accounts/shippingAddress/shippingAddress.types'

// Billing Address interface
export interface RecurlyBillingAddress {
	first_name?: string
	last_name?: string
	phone?: string
	street1?: string
	street2?: string
	city?: string
	region?: string
	postal_code?: string
	country?: string
	geo_code?: string
}

// Payment Gateway Used interface
export interface RecurlyPaymentGatewayUsed {
	id?: string
	object?: string
	type?: string
	name?: string
}

// Line Item interface
export interface RecurlyLineItem {
	id?: string
	object?: string
	uuid?: string
	type?: 'charge' | 'credit'
	item_code?: string
	item_id?: string
	external_sku?: string
	revenue_schedule_type?: 'at_range_end' | 'at_range_start' | 'evenly' | 'never'
	state?: 'pending' | 'invoiced' | 'failed'
	legacy_category?: string
	account?: RecurlyAccountMini
	bill_for_account_id?: string
	subscription_id?: string
	plan_id?: string
	plan_code?: string
	add_on_id?: string
	add_on_code?: string
	quantity?: number
	unit_amount?: number
	unit_amount_decimal?: string
	subtotal?: number
	taxable?: boolean
	tax?: number
	tax_exempt?: boolean
	tax_code?: string
	tax_info?: RecurlyTaxInfo
	total?: number
	credit_applied?: number
	credit_reason_code?: string
	original_line_item_invoice_id?: string
	previous_line_item_id?: string
	description?: string
	accounting_code?: string
	product_code?: string
	origin?:
		| 'plan'
		| 'add_on'
		| 'one_time'
		| 'debit'
		| 'credit'
		| 'coupon'
		| 'add_on_trial'
		| 'carryforward'
		| 'prepayment'
	amount?: number
	discount?: number
	avalara_transaction_type?: number
	avalara_service_type?: number
	start_date?: string
	end_date?: string
	created_at?: string
	updated_at?: string
	prorated?: boolean
	proration_rate?: number
	refund?: boolean
	refunded_quantity?: number
	shipping_address?: RecurlyShippingAddress
	destination_tax_address_source?: 'shipping' | 'billing'
}

// Tax Info interface
export interface RecurlyTaxInfo {
	type?: string
	region?: string
	rate?: number
	tax_details?: RecurlyTaxDetail[]
}

// Tax Detail interface
export interface RecurlyTaxDetail {
	type?: string
	region?: string
	rate?: number
	tax?: number
	name?: string
	level?: string
	billable?: boolean
}

// Discount interface
export interface RecurlyDiscount {
	type?: 'percent' | 'fixed' | 'free_trial'
	percent?: number
	currencies?: RecurlyCurrencyAmount[]
	trial?: RecurlyTrial
}

// Currency Amount interface
export interface RecurlyCurrencyAmount {
	currency?: string
	amount?: number
}

// Trial interface
export interface RecurlyTrial {
	unit?: string
	length?: number
}

// Fraud Risk Rule interface
export interface RecurlyFraudRiskRule {
	code?: string
	message?: string
}
