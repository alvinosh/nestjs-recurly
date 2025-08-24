// Enums
export type RecurlyCustomFieldDefinitionRelatedType = 'account' | 'item' | 'plan' | 'subscription' | 'charge'

export type RecurlyCustomFieldDefinitionUserAccess = 'api_only' | 'read_only' | 'write' | 'set_only'

// Custom Field Definition interface
export interface RecurlyCustomFieldDefinition {
	id?: string
	object?: string
	related_type?: RecurlyCustomFieldDefinitionRelatedType
	name?: string
	user_access?: RecurlyCustomFieldDefinitionUserAccess
	display_name?: string
	tooltip?: string
	created_at?: string
	updated_at?: string
	deleted_at?: string
}

// Custom Field Definition List Response
export interface RecurlyCustomFieldDefinitionListResponse {
	object?: string
	has_more?: boolean
	next?: string
	data?: RecurlyCustomFieldDefinition[]
}
