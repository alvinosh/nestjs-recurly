// Subscription Types
export interface RecurlySubscription {
	id?: string
	object?: string
	uuid?: string
	account?: RecurlyAccountMini
	plan?: RecurlyPlanMini
	state?: 'active' | 'canceled' | 'expired' | 'failed' | 'future' | 'paused'
	shipping?: RecurlySubscriptionShipping
	coupon_redemptions?: RecurlyCouponRedemptionMini[]
	pending_change?: RecurlySubscriptionChange
	current_period_started_at?: string
	current_period_ends_at?: string
	current_term_started_at?: string
	current_term_ends_at?: string
	trial_started_at?: string
	trial_ends_at?: string
	remaining_billing_cycles?: number
	total_billing_cycles?: number
	renewal_billing_cycles?: number
	auto_renew?: boolean
	ramp_intervals?: RecurlySubscriptionRampIntervalResponse[]
	paused_at?: string
	remaining_pause_cycles?: number
	currency?: string
	revenue_schedule_type?: 'at_range_end' | 'at_range_start' | 'evenly' | 'never'
	unit_amount?: number
	tax_inclusive?: boolean
	quantity?: number
	add_ons?: RecurlySubscriptionAddOn[]
	add_ons_total?: number
	subtotal?: number
	tax?: number
	tax_info?: RecurlyTaxInfo
	price_segment_id?: RecurlyPriceSegmentIdOrCode
	total?: number
	collection_method?: 'automatic' | 'manual'
	po_number?: string
	net_terms?: number
	net_terms_type?: 'net' | 'eom'
	terms_and_conditions?: string
	customer_notes?: string
	expiration_reason?: string
	custom_fields?: RecurlyCustomField[]
	created_at?: string
	updated_at?: string
	activated_at?: string
	canceled_at?: string
	expires_at?: string
	bank_account_authorized_at?: string
	gateway_code?: string
	billing_info_id?: string
	active_invoice_id?: string
	business_entity_id?: string
	started_with_gift?: boolean
	converted_at?: string
	action_result?: any
}

export interface RecurlySubscriptionList {
	object?: string
	has_more?: boolean
	next?: string
	data?: RecurlySubscription[]
}

export interface RecurlyAccountMini {
	id?: string
	object?: string
	code?: string
	email?: string
	first_name?: string
	last_name?: string
	company?: string
	parent_account_id?: string
	bill_to?: string
	dunning_campaign_id?: string
}

export interface RecurlyPlanMini {
	id?: string
	object?: string
	code?: string
	name?: string
}

export interface RecurlySubscriptionShipping {
	address?: RecurlyShippingAddress
	method?: RecurlyShippingMethodMini
	amount?: number
}

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

export interface RecurlyShippingMethodMini {
	id?: string
	object?: string
	code?: string
	name?: string
}

export interface RecurlyCouponRedemptionMini {
	id?: string
	object?: string
	coupon?: RecurlyCouponMini
	discounted_amount?: number
}

export interface RecurlyCouponMini {
	id?: string
	object?: string
	code?: string
	name?: string
	state?: string
	discount?: RecurlyDiscount
	expired_at?: string
}

export interface RecurlyDiscount {
	type?: string
	percent?: number
	currencies?: RecurlyCurrencyAmount[]
	trial?: RecurlyTrial
}

export interface RecurlyCurrencyAmount {
	currency?: string
	amount?: number
}

export interface RecurlyTrial {
	unit?: string
	length?: number
}

export interface RecurlySubscriptionChange {
	id?: string
	object?: string
	subscription_id?: string
	plan?: RecurlyPlanMini
	add_ons?: RecurlySubscriptionAddOn[]
	unit_amount?: number
	tax_inclusive?: boolean
	quantity?: number
	shipping?: RecurlySubscriptionShipping
	activate_at?: string
	revenue_schedule_type?: string
	custom_fields?: RecurlyCustomField[]
	created_at?: string
	updated_at?: string
}

export interface RecurlySubscriptionAddOn {
	id?: string
	object?: string
	add_on?: RecurlyAddOnMini
	add_on_source?: string
	unit_amount?: number
	tax_inclusive?: boolean
	quantity?: number
	percentage_tiers?: RecurlyPercentageTier[]
	created_at?: string
	updated_at?: string
	expired_at?: string
}

export interface RecurlyAddOnMini {
	id?: string
	object?: string
	code?: string
	name?: string
	accounting_code?: string
	external_sku?: string
	state?: string
	item_id?: string
	measured_unit_id?: string
	usage_type?: string
	usage_calculation_type?: string
	revenue_schedule_type?: string
}

export interface RecurlyPercentageTier {
	ending_amount?: number
	usage_percentage?: string
}

export interface RecurlySubscriptionRampIntervalResponse {
	starting_on?: string
	unit_amount?: number
}

export interface RecurlyTaxInfo {
	type?: string
	region?: string
	rate?: number
}

export interface RecurlyPriceSegmentIdOrCode {
	id?: string
	code?: string
}

export interface RecurlyCustomField {
	name?: string
	value?: string
}
