export interface RecurlyCurrency {
	currency: string
	discount: number
}

// Custom Field interface
export interface RecurlyCustomField {
	name: string
	value: string | null
}

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
