// Enums
export type RecurlyGeneralLedgerAccountType = 'liability' | 'revenue'

// Full General Ledger Account interface
export interface RecurlyGeneralLedgerAccount {
	id?: string
	object?: string
	code?: string
	description?: string
	account_type?: RecurlyGeneralLedgerAccountType
	created_at?: string
	updated_at?: string
}

// General Ledger Account List Response
export interface RecurlyGeneralLedgerAccountListResponse {
	object?: string
	has_more?: boolean
	next?: string
	data: RecurlyGeneralLedgerAccount[]
}
