// Enums
export type RecurlySiteMode = 'development' | 'production' | 'sandbox'

export type RecurlySiteFeature = 'credit_memos' | 'manual_invoicing' | 'only_bill_what_changed' | 'subscription_terms'

export type RecurlyBillingAddressRequirement = 'full' | 'none' | 'streetzip' | 'zip'

// Address interface
export interface RecurlyAddress {
	phone?: string
	street1?: string
	street2?: string
	city?: string
	region?: string
	postal_code?: string
	country?: string
	geo_code?: string
}

// Site Settings interface
export interface RecurlySiteSettings {
	billing_address_requirement?: RecurlyBillingAddressRequirement
	accepted_currencies?: string[]
	default_currency?: string
}

// Site Mini interface
export interface RecurlySiteMini {
	id?: string
	object?: string
	subdomain?: string
}

// Full Site interface
export interface RecurlySite extends RecurlySiteMini {
	public_api_key?: string
	mode?: RecurlySiteMode
	address?: RecurlyAddress
	settings?: RecurlySiteSettings
	features?: RecurlySiteFeature[]
	created_at?: string
	updated_at?: string
	deleted_at?: string
}

// Site List Response
export interface RecurlySiteListResponse {
	object?: string
	has_more?: boolean
	next?: string
	data: RecurlySite[]
}
