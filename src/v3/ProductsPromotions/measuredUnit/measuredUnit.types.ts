export interface RecurlyMeasuredUnit {
	id?: string
	object?: string
	name: string
	display_name: string
	state?: 'active' | 'inactive'
	description?: string
	created_at?: string
	updated_at?: string
	deleted_at?: string
}

export interface RecurlyMeasuredUnitList {
	object: string
	has_more: boolean
	next?: string
	data: RecurlyMeasuredUnit[]
}

export interface RecurlyMeasuredUnitCreate {
	name: string
	display_name: string
	description?: string
}

export interface RecurlyMeasuredUnitUpdate {
	name?: string
	display_name?: string
	description?: string
}
