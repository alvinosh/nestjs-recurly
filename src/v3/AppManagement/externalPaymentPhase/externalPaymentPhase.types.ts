// External Payment Phase interface
export interface RecurlyExternalPaymentPhase {
	id?: string
	object?: string
	started_at?: string
	ends_at?: string
	starting_billing_period_index?: number
	ending_billing_period_index?: number
	offer_type?: string
	offer_name?: string
	period_count?: number
	period_length?: string
	amount?: string
	currency?: string
	created_at?: string
	updated_at?: string
}

// External Payment Phase List Response
export interface RecurlyExternalPaymentPhaseListResponse {
	object?: string
	has_more?: boolean
	next?: string
	data?: RecurlyExternalPaymentPhase[]
}
