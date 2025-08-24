import { RecurlyCoupon, RecurlyCouponMini } from '../../coupon/coupon.types'
import { RecurlyAccountMini } from '../accounts.types'

export interface RecurlyCouponRedemption {
	id: string
	object: string
	account?: RecurlyAccountMini
	subscription_id?: string
	coupon: RecurlyCoupon
	state: 'active' | 'inactive'
	currency?: string
	discounted?: number
	created_at: string
	updated_at: string
	removed_at?: string
}

export interface RecurlyCouponRedemptionMini {
	id: string
	object: string
	coupon: RecurlyCouponMini
}

export interface RecurlyCouponRedemptionList {
	object: string
	has_more: boolean
	next?: string
	data: RecurlyCouponRedemption[]
}

export interface RecurlyCouponRedemptionCreate {
	coupon_id: string
	currency?: string
	subscription_id?: string
}
