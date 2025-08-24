// Shipping Method Mini interface
export interface RecurlyShippingMethodMini {
	id?: string
	object?: string
	code?: string
	name?: string
}

// Full Shipping Method interface
export interface RecurlyShippingMethod extends RecurlyShippingMethodMini {
	accounting_code?: string
	tax_code?: string
	liability_gl_account_id?: string
	revenue_gl_account_id?: string
	performance_obligation_id?: string
	created_at?: string
	updated_at?: string
	deleted_at?: string
}

// Shipping Method List Response
export interface RecurlyShippingMethodListResponse {
	object?: string
	has_more?: boolean
	next?: string
	data: RecurlyShippingMethod[]
}
