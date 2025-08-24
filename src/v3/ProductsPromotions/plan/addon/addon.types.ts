export interface RecurlyAddOnPricing {
	currency: string
	unit_amount?: number
	unit_amount_decimal?: string
	tax_inclusive?: boolean
}

export interface RecurlyAddOn {
	id?: string
	object?: string
	plan_id?: string
	code: string
	state?: 'active' | 'inactive'
	name: string
	add_on_type?: 'fixed' | 'usage'
	usage_type?: 'price' | 'percentage'
	usage_calculation_type?: 'cumulative' | 'last_in_period'
	usage_percentage?: number
	measured_unit_id?: string
	liability_gl_account_id?: string
	revenue_gl_account_id?: string
	performance_obligation_id?: string
	accounting_code?: string
	revenue_schedule_type?: 'at_range_end' | 'at_range_start' | 'evenly' | 'never'
	avalara_transaction_type?: number
	avalara_service_type?: number
	tax_code?: string
	display_quantity?: boolean
	default_quantity?: number
	optional?: boolean
	currencies?: RecurlyAddOnPricing[]
	item?: any // ItemMini
	tier_type?: 'flat' | 'tiered' | 'stairstep' | 'volume'
	usage_timeframe?: 'billing_period' | 'subscription_term'
	tiers?: any[] // Tier[]
	percentage_tiers?: any[] // PercentageTiersByCurrency[]
	external_sku?: string
	created_at?: string
	updated_at?: string
	deleted_at?: string
}

export interface RecurlyAddOnList {
	object: string
	has_more: boolean
	next?: string
	data: RecurlyAddOn[]
}

export interface RecurlyAddOnCreate {
	item_code?: string
	item_id?: string
	code?: string
	name?: string
	add_on_type?: 'fixed' | 'usage'
	usage_type?: 'price' | 'percentage'
	usage_calculation_type?: 'cumulative' | 'last_in_period'
	usage_percentage?: number
	measured_unit_id?: string
	measured_unit_name?: string
	plan_id?: string
	liability_gl_account_id?: string
	revenue_gl_account_id?: string
	performance_obligation_id?: string
	accounting_code?: string
	revenue_schedule_type?: 'at_range_end' | 'at_range_start' | 'evenly' | 'never'
	display_quantity?: boolean
	default_quantity?: number
	optional?: boolean
	avalara_transaction_type?: number
	avalara_service_type?: number
	tax_code?: string
	currencies?: RecurlyAddOnPricing[]
	tier_type?: 'flat' | 'tiered' | 'stairstep' | 'volume'
	usage_timeframe?: 'billing_period' | 'subscription_term'
	tiers?: any[] // Tier[]
	percentage_tiers?: any[] // PercentageTiersByCurrency[]
}

export interface RecurlyAddOnUpdate {
	id?: string
	code?: string
	name?: string
	usage_percentage?: number
	usage_calculation_type?: 'cumulative' | 'last_in_period'
	measured_unit_id?: string
	measured_unit_name?: string
	accounting_code?: string
	liability_gl_account_id?: string
	revenue_gl_account_id?: string
	performance_obligation_id?: string
	revenue_schedule_type?: 'at_range_end' | 'at_range_start' | 'evenly' | 'never'
	avalara_transaction_type?: number
	avalara_service_type?: number
	tax_code?: string
	display_quantity?: boolean
	default_quantity?: number
	optional?: boolean
	currencies?: RecurlyAddOnPricing[]
	tiers?: any[] // Tier[]
	percentage_tiers?: any[] // PercentageTiersByCurrency[]
}
