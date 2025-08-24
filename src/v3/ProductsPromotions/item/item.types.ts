import { RecurlyCustomField } from '../../v3.types'

// Enums
export type RecurlyItemState = 'active' | 'inactive'

export type RecurlyRevenueScheduleType = 'at_range_end' | 'at_range_start' | 'evenly' | 'never'

// Pricing interface
export interface RecurlyPricing {
	currency: string
	unit_amount: number
	tax_inclusive?: boolean
}

// Item Mini interface
export interface RecurlyItemMini {
	id?: string
	object?: string
	code: string
	state?: RecurlyItemState
	name: string
	description?: string
}

// Full Item interface
export interface RecurlyItem {
	id?: string
	object?: string
	code: string
	state?: RecurlyItemState
	name: string
	description?: string
	external_sku?: string
	accounting_code?: string
	revenue_schedule_type?: RecurlyRevenueScheduleType
	performance_obligation_id?: string
	liability_gl_account_id?: string
	revenue_gl_account_id?: string
	avalara_transaction_type?: number
	avalara_service_type?: number
	tax_code?: string
	tax_exempt?: boolean
	custom_fields?: RecurlyCustomField[]
	currencies?: RecurlyPricing[]
	created_at?: string
	updated_at?: string
	deleted_at?: string
}

// Item List Response
export interface RecurlyItemListResponse {
	object?: string
	has_more?: boolean
	next?: string
	data: RecurlyItem[]
}
