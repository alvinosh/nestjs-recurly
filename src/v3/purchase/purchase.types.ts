// Purchase response types based on Recurly API documentation

// Invoice Collection - the main response type for purchase endpoints
export interface RecurlyInvoiceCollection {
	object?: string
	charge_invoice?: RecurlyInvoice
	credit_invoices?: RecurlyInvoice[]
}

// Invoice type for the invoice collection
export interface RecurlyInvoice {
	id?: string
	object?: string
	type?: 'charge' | 'credit' | 'legacy'
	origin?:
		| 'purchase'
		| 'renewal'
		| 'immediate_change'
		| 'termination'
		| 'modification'
		| 'one_time'
		| 'credit'
		| 'legacy'
		| 'prepayment'
		| 'carryforward_credit'
		| 'carryforward_debit'
		| 'usage'
		| 'refund'
		| 'one_time_gift_card'
	state?: 'pending' | 'processing' | 'past_due' | 'paid' | 'failed' | 'closed' | 'voided' | 'draft' | 'open'
	account?: RecurlyAccountMini
	subscription_ids?: string[]
	currency?: string
	credit_payments?: RecurlyCreditPayment[]
	transactions?: RecurlyTransaction[]
	line_items?: RecurlyLineItem[]
	coupon_redemptions?: RecurlyCouponRedemption[]
	refundable_amount?: number
	subtotal?: number
	discount?: number
	due_on?: string
	created_at?: string
	updated_at?: string
	tax?: number
	total?: number
	paid?: number
	po_number?: string
	terms_and_conditions?: string
	customer_notes?: string
	vat_number?: string
	vat_reverse_charge_notes?: string
	tax_info?: RecurlyTaxInfo
	balance?: number
	closed_at?: string
	dunning_events_sent?: number
	final_dunning_event?: boolean
	number?: string
	collection_method?: 'automatic' | 'manual'
	net_terms?: number
	net_terms_type?: 'net' | 'eom'
	address?: RecurlyInvoiceAddress
	shipping_address?: RecurlyShippingAddress
	billing_info_id?: string
	refundable?: boolean
	total_billing_cycles?: number
	dunning_campaign_id?: string
	business_entity_id?: string
}

// Account Mini interface
export interface RecurlyAccountMini {
	id?: string
	object?: string
	code?: string
	email?: string
	first_name?: string
	last_name?: string
	company?: string
	parent_account_id?: string
	bill_to?: 'self' | 'parent'
	dunning_campaign_id?: string
}

// Credit Payment interface
export interface RecurlyCreditPayment {
	id?: string
	object?: string
	uuid?: string
	action?: 'payment' | 'reduction' | 'refund' | 'write_off'
	account?: RecurlyAccountMini
	applied_to_invoice?: RecurlyInvoiceMini
	original_invoice?: RecurlyInvoiceMini
	currency?: string
	amount?: number
	original_credit_payment_id?: string
	refund_transaction?: RecurlyTransaction
	created_at?: string
	updated_at?: string
	voided_at?: string
}

// Invoice Mini interface
export interface RecurlyInvoiceMini {
	id?: string
	object?: string
	number?: string
	type?: string
	state?: string
	total?: number
	balance?: number
}

// Transaction interface
export interface RecurlyTransaction {
	id?: string
	object?: string
	uuid?: string
	original_transaction_id?: string
	account?: RecurlyAccountMini
	invoice?: RecurlyInvoiceMini
	voided_by_invoice?: RecurlyInvoiceMini
	subscription_ids?: string[]
	type?: 'authorization' | 'capture' | 'payment' | 'refund' | 'verify' | 'credit_payment'
	origin?:
		| 'api'
		| 'hpp'
		| 'merchant'
		| 'recurly_admin'
		| 'recurlyjs'
		| 'recurring'
		| 'transparent'
		| 'force_collect'
		| 'refunded_externally'
		| 'import'
		| 'gifting'
		| 'in_app_purchase'
		| 'apple_pay'
		| 'updated_billing_info'
		| 'test_payment_method_api'
	currency?: string
	amount?: number
	status?:
		| 'success'
		| 'declined'
		| 'void'
		| 'pending'
		| 'processing'
		| 'processing_retry'
		| 'scheduled'
		| 'gateway_processing'
		| 'chargeback'
	success?: boolean
	backup_payment_method_used?: boolean
	refunded?: boolean
	billing_address?: RecurlyBillingAddress
	collection_method?: 'automatic' | 'manual'
	payment_method?: RecurlyPaymentMethod
	ip_address_v4?: string
	ip_address_v6?: string
	ip_address_country?: string
	status_code?: string
	status_message?: string
	customer_message?: string
	customer_message_locale?: string
	payment_gateway?: RecurlyPaymentGatewayUsed
	gateway_message?: string
	gateway_reference?: string
	gateway_approval_code?: string
	gateway_response_code?: string
	gateway_response_time?: number
	gateway_response_values?: any
	cvv_check?: 'success' | 'failure' | 'unavailable' | 'not_supplied'
	avs_check?: 'success' | 'failure' | 'unavailable' | 'not_supplied'
	created_at?: string
	updated_at?: string
	voided_at?: string
	collected_at?: string
	action_result?: any
	vat_number?: string
	fraud_info?: RecurlyFraudInfo
}

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
	cc_bin_country?: string
	gateway_code?: string
	billing_agreement_id?: string
	name_on_account?: string
	account_type?: string
	routing_number?: string
	routing_number_bank?: string
	username?: string
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

// Coupon Redemption interface
export interface RecurlyCouponRedemption {
	id?: string
	object?: string
	account?: RecurlyAccountMini
	subscription_id?: string
	coupon?: RecurlyCoupon
	state?: 'active' | 'inactive' | 'expired'
	currency?: string
	discounted?: number
	created_at?: string
	updated_at?: string
	removed_at?: string
}

// Coupon interface
export interface RecurlyCoupon {
	id?: string
	object?: string
	code?: string
	name?: string
	state?: 'redeemable' | 'expired' | 'maxed_out' | 'inactive'
	max_redemptions?: number
	max_redemptions_per_account?: number
	unique_coupon_codes_count?: number
	unique_code_template?: string
	unique_coupon_code?: RecurlyUniqueCouponCode
	duration?: 'forever' | 'single_use' | 'temporal'
	temporal_amount?: number
	temporal_unit?: 'day' | 'week' | 'month' | 'year'
	free_trial_unit?: 'day' | 'week' | 'month' | 'year'
	free_trial_amount?: number
	applies_to_all_plans?: boolean
	applies_to_all_items?: boolean
	applies_to_non_plan_charges?: boolean
	plans?: RecurlyPlanMini[]
	items?: RecurlyItemMini[]
	redemption_resource?: 'account' | 'subscription'
	discount?: RecurlyDiscount
	coupon_type?: 'single_code' | 'bulk'
	hosted_page_description?: string
	invoice_description?: string
	redeem_by?: string
	created_at?: string
	updated_at?: string
	expired_at?: string
}

// Unique Coupon Code interface
export interface RecurlyUniqueCouponCode {
	id?: string
	object?: string
	code?: string
	state?: 'redeemable' | 'redeemed' | 'inactive'
	bulk_coupon_id?: string
	bulk_coupon_code?: string
	created_at?: string
	updated_at?: string
	redeemed_at?: string
	expired_at?: string
}

// Plan Mini interface
export interface RecurlyPlanMini {
	id?: string
	object?: string
	code?: string
	name?: string
}

// Item Mini interface
export interface RecurlyItemMini {
	id?: string
	object?: string
	code?: string
	state?: 'active' | 'inactive'
	name?: string
	description?: string
	external_sku?: string
	accounting_code?: string
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

// Invoice Address interface
export interface RecurlyInvoiceAddress {
	name_on_account?: string
	company?: string
	phone?: string
	street1?: string
	street2?: string
	city?: string
	region?: string
	postal_code?: string
	country?: string
	first_name?: string
	last_name?: string
	geo_code?: string
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

// Fraud Info interface
export interface RecurlyFraudInfo {
	score?: number
	decision?: 'approve' | 'review' | 'decline' | 'escalate'
	risk_rules_triggered?: RecurlyFraudRiskRule[]
}

// Fraud Risk Rule interface
export interface RecurlyFraudRiskRule {
	code?: string
	message?: string
}
