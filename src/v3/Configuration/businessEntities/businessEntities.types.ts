import { RecurlyAddress } from '@/v3/v3.types'

// Enums
export type RecurlyOriginTaxAddressSource = 'origin' | 'destination'
export type RecurlyDestinationTaxAddressSource = 'destination' | 'origin'

// Business Entity Mini interface
export interface RecurlyBusinessEntityMini {
	id?: string
	object?: string
	code?: string
	name?: string
}

// Full Business Entity interface
export interface RecurlyBusinessEntity extends RecurlyBusinessEntityMini {
	invoice_display_address?: RecurlyAddress
	tax_address?: RecurlyAddress
	origin_tax_address_source?: RecurlyOriginTaxAddressSource
	destination_tax_address_source?: RecurlyDestinationTaxAddressSource
	default_vat_number?: string
	default_registration_number?: string
	subscriber_location_countries?: string[]
	default_liability_gl_account_id?: string
	default_revenue_gl_account_id?: string
	created_at?: string
	updated_at?: string
}

// Business Entity List Response
export interface RecurlyBusinessEntityListResponse {
	object?: string
	has_more?: boolean
	next?: string
	data?: RecurlyBusinessEntity[]
}
