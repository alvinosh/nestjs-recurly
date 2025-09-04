import { RecurlyItemMini } from '../item/item.types'
import { RecurlyPlanMini } from '../plan/plan.types'

export interface RecurlyCouponDiscountTrial {
	unit: 'day' | 'month' | 'week'
	length: number
}

export interface RecurlyCouponDiscountPricing {
	currency: string
	amount: number
}

export interface RecurlyCouponDiscount {
	type: 'fixed' | 'free_trial' | 'percent'
	percent?: number
	currencies?: RecurlyCouponDiscountPricing[]
	trial?: RecurlyCouponDiscountTrial
}

export interface RecurlyCouponMini {
	id?: string
	object?: string
	code?: string
	name?: string
	state?: 'expired' | 'maxed_out' | 'redeemable'
	discount?: RecurlyCouponDiscount
	coupon_type?: 'bulk' | 'single_code'
	expired_at?: string
}

export interface RecurlyCoupon {
	id: string
	object: string
	code: string
	name: string
	state: 'expired' | 'maxed_out' | 'redeemable'
	max_redemptions?: number
	max_redemptions_per_account?: number
	unique_coupon_codes_count?: number
	unique_code_template?: string
	unique_coupon_code?: any
	duration: 'forever' | 'single_use' | 'temporal'
	temporal_amount?: number
	temporal_unit?: 'day' | 'month' | 'week' | 'year'
	free_trial_unit?: 'day' | 'month' | 'week'
	free_trial_amount?: number
	applies_to_all_plans?: boolean
	applies_to_all_items?: boolean
	applies_to_non_plan_charges?: boolean
	plans?: RecurlyPlanMini[]
	items?: RecurlyItemMini[]
	redemption_resource: 'account' | 'subscription'
	discount: RecurlyCouponDiscount
	coupon_type: 'bulk' | 'single_code'
	hosted_page_description?: string
	invoice_description?: string
	redeem_by?: string
	created_at: string
	updated_at: string
	expired_at?: string
}

export interface RecurlyCouponList {
	object: string
	has_more: boolean
	next?: string
	data: RecurlyCoupon[]
}
