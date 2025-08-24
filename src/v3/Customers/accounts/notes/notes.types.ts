// Account Note Types
export interface RecurlyAccountNote {
	id?: string
	object?: string
	account_id?: string
	user?: RecurlyUser
	message: string
	created_at?: string
}

export interface RecurlyUser {
	id?: string
	object?: string
	email?: string
	first_name?: string
	last_name?: string
	time_zone?: string
	created_at?: string
	deleted_at?: string
}

export interface RecurlyAccountNoteListResponse {
	object?: string
	has_more?: boolean
	next?: string
	data?: RecurlyAccountNote[]
}
