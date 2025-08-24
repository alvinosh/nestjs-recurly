// Main External Account interface
export interface RecurlyExternalAccount {
	id?: string
	object?: string
	external_account_code?: string
	external_connection_type?: string
	created_at?: string
	updated_at?: string
}

// External Account List Response
export interface RecurlyExternalAccountListResponse {
	object?: string
	has_more?: boolean
	next?: string
	data?: RecurlyExternalAccount[]
}
