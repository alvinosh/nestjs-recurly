import { RecurlyCustomField } from '../../v3.types'

// Enums
export type RecurlyPlanState = 'active' | 'inactive'

export type RecurlyPricingModel = 'fixed' | 'ramp'

export type RecurlyIntervalUnit = 'days' | 'months'

export type RecurlyTrialUnit = 'days' | 'months'

export type RecurlyRevenueScheduleType = 'at_range_end' | 'at_range_start' | 'evenly' | 'never'

export type RecurlyVertexTransactionType = 'sale' | 'rental' | 'lease'

// Plan Pricing interface
export interface RecurlyPlanPricing {
	currency: string
	setup_fee?: number
	unit_amount?: number
	price_segment_id?: string
	tax_inclusive?: boolean
}

// Plan Setup Pricing interface
export interface RecurlyPlanSetupPricing {
	currency: string
	unit_amount?: number
}

// Plan Ramp Pricing interface
export interface RecurlyPlanRampPricing {
	currency: string
	unit_amount: number
	price_segment_id?: string
}

// Plan Ramp Interval interface
export interface RecurlyPlanRampInterval {
	starting_billing_cycle?: number
	currencies?: RecurlyPlanRampPricing[]
}

// Plan Hosted Pages interface
export interface RecurlyPlanHostedPages {
	success_url?: string
	cancel_url?: string
	bypass_confirmation?: boolean
	display_quantity?: boolean
}

// Plan Mini interface
export interface RecurlyPlanMini {
	id?: string
	object?: string
	code: string
	name: string
}

// Full Plan interface
export interface RecurlyPlan extends RecurlyPlanMini {
	state?: RecurlyPlanState
	pricing_model?: RecurlyPricingModel
	currencies?: RecurlyPlanPricing[]
	ramp_intervals?: RecurlyPlanRampInterval[]
	setup_fees?: RecurlyPlanSetupPricing[]
	interval_unit?: RecurlyIntervalUnit
	interval_length?: number
	description?: string
	accounting_code?: string
	revenue_schedule_type?: RecurlyRevenueScheduleType
	liability_gl_account_id?: string
	revenue_gl_account_id?: string
	performance_obligation_id?: string
	setup_fee_accounting_code?: string
	setup_fee_revenue_schedule_type?: RecurlyRevenueScheduleType
	setup_fee_liability_gl_account_id?: string
	setup_fee_revenue_gl_account_id?: string
	setup_fee_performance_obligation_id?: string
	trial_unit?: RecurlyTrialUnit
	trial_length?: number
	trial_requires_billing_info?: boolean
	total_billing_cycles?: number
	auto_renew?: boolean
	custom_fields?: RecurlyCustomField[]
	avalara_transaction_type?: number
	avalara_service_type?: number
	tax_code?: string
	tax_exempt?: boolean
	vertex_transaction_type?: RecurlyVertexTransactionType
	hosted_pages?: RecurlyPlanHostedPages
	allow_any_item_on_subscriptions?: boolean
	dunning_campaign_id?: string
	created_at?: string
	updated_at?: string
	deleted_at?: string
}

// Plan List Response
export interface RecurlyPlanListResponse {
	object?: string
	has_more?: boolean
	next?: string
	data: RecurlyPlan[]
}
