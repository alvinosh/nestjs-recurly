export interface RecurlyUniqueCouponCode {
	id?: string
	object?: string
	code: string
	state?: 'expired' | 'inactive' | 'maxed_out' | 'redeemable'
	bulk_coupon_id?: string
	bulk_coupon_code?: string
	created_at?: string
	updated_at?: string
	redeemed_at?: string
	expired_at?: string
}

export interface RecurlyUniqueCouponCodeList {
	object: string
	has_more: boolean
	next?: string
	data: RecurlyUniqueCouponCode[]
}

export interface RecurlyUniqueCouponCodeParams {
	limit?: number
	order?: string
	sort?: string
	begin_time?: string
}
