// Shipping Address Types
export interface RecurlyShippingAddress {
	id?: string
	object?: string
	account_id?: string
	nickname?: string
	first_name?: string
	last_name?: string
	company?: string
	email?: string
	vat_number?: string
	phone?: string
	street1?: string
	street2?: string
	city?: string
	region?: string
	postal_code?: string
	country?: string
	geo_code?: string
	created_at?: string
	updated_at?: string
}

export interface RecurlyShippingAddressList {
	object?: string
	has_more?: boolean
	next?: string
	data?: RecurlyShippingAddress[]
}
