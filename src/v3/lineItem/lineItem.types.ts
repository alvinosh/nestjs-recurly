// Types for Recurly Line Item entity, based on API schema

export type RecurlyLineItemType = 'charge' | 'credit'
export type RecurlyLineItemState = 'invoiced' | 'pending'
export type RecurlyLineItemLegacyCategory = 'applied_credit' | 'carryforward' | 'charge' | 'credit'
export type RecurlyLineItemOrigin =
	| 'add_on'
	| 'add_on_trial'
	| 'carryforward'
	| 'coupon'
	| 'credit'
	| 'debit'
	| 'one_time'
	| 'plan'
	| 'plan_trial'
	| 'setup_fee'
	| 'prepayment'
export type RecurlyLineItemCreditReasonCode =
	| 'general'
	| 'gift_card'
	| 'promotional'
	| 'refund'
	| 'service'
	| 'write_off'
export type RecurlyLineItemRevenueScheduleType = 'at_invoice' | 'at_range_end' | 'at_range_start' | 'evenly' | 'never'

export interface RecurlyLineItem {
	id: string
	object?: string
	uuid?: string
	type: RecurlyLineItemType
	item_code?: string
	item_id?: string
	external_sku?: string
	revenue_schedule_type?: RecurlyLineItemRevenueScheduleType
	state?: RecurlyLineItemState
	legacy_category?: RecurlyLineItemLegacyCategory
	account?: any // Use AccountMini type if available
	bill_for_account_id?: string
	subscription_id?: string
	plan_id?: string
	plan_code?: string
	add_on_id?: string
	add_on_code?: string
	invoice_id?: string
	invoice_number?: string
	previous_line_item_id?: string
	original_line_item_invoice_id?: string
	origin?: RecurlyLineItemOrigin
	accounting_code?: string
	product_code?: string
	credit_reason_code?: RecurlyLineItemCreditReasonCode
	currency: string
	amount?: number
	description?: string
	quantity?: number
	quantity_decimal?: string
	unit_amount?: number
	unit_amount_decimal?: string
	tax_inclusive?: boolean
	subtotal?: number
	discount?: number
	liability_gl_account_code?: string
	revenue_gl_account_code?: string
	performance_obligation_id?: string
	tax?: number
	taxable?: boolean
	tax_exempt?: boolean
	avalara_transaction_type?: number
	avalara_service_type?: number
	tax_code?: string
	tax_info?: any // Use TaxInfo type if available
	origin_tax_address_source?: 'origin' | 'destination'
	destination_tax_address_source?: 'destination' | 'origin'
	proration_rate?: number
	refund?: boolean
	refunded_quantity?: number
	refunded_quantity_decimal?: string
	credit_applied?: number
	shipping_address?: any // Use ShippingAddress type if available
	start_date?: string
	end_date?: string
	custom_fields?: any // Use CustomFields type if available
	created_at?: string
	updated_at?: string
}

export interface RecurlyLineItemListResponse {
	data: RecurlyLineItem[]
	object: string
	has_more: boolean
	next?: string
}
