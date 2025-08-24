// External Product Reference Mini interface
export interface RecurlyExternalProductReferenceMini {
	id?: string
	object?: string
	reference_code?: string
	external_connection_type?: string
	created_at?: string
	updated_at?: string
}

// External Product Reference Collection Response
export interface RecurlyExternalProductReferenceListResponse {
	object?: string
	has_more?: boolean
	next?: string
	data?: RecurlyExternalProductReferenceMini[]
}
