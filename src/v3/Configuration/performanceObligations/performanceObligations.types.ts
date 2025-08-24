// Performance Obligation interface
export interface RecurlyPerformanceObligation {
	id?: string
	object?: string
	name?: string
	created_at?: string
	updated_at?: string
}

// Performance Obligation List Response
export interface RecurlyPerformanceObligationListResponse {
	object?: string
	has_more?: boolean
	next?: string
	data?: RecurlyPerformanceObligation[]
}
