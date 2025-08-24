import { RecurlyAccountMini } from '../accounts.types'

// Account Acquisition Types
export interface RecurlyAccountAcquisition {
	id?: string
	object?: string
	account?: RecurlyAccountMini
	/** Monetary cost; may be omitted or null if not set */
	cost?: RecurlyAccountAcquisitionCost | null
	/** Acquisition channel; may be omitted or null if not set.
	 *  Refer to the v2021-02-25 API reference for allowed enum values (e.g., "organic", "referral", "paid", etc.). */
	channel?: RecurlyAccountAcquisitionChannel | null
	subchannel?: string
	campaign?: string
	/** ISO 8601 date-time when the account was acquired */
	acquired_at?: string
	/** ISO 8601 date-time when the acquisition record was created */
	created_at?: string
	/** ISO 8601 date-time when the acquisition record was last updated */
	updated_at?: string
}

export interface RecurlyAccountAcquisitionCost {
	currency?: string
	amount?: number
}

export enum RecurlyAccountAcquisitionChannel {
	ADVERTISING = 'advertising',
	BLOG = 'blog',
	DIRECT_TRAFFIC = 'direct_traffic',
	EMAIL = 'email',
	EVENTS = 'events',
	MARKETING_CONTENT = 'marketing_content',
	ORGANIC_SEARCH = 'organic_search',
	OTHER = 'other',
	OUTBOUND_SALES = 'outbound_sales',
	PAID_SEARCH = 'paid_search',
	PUBLIC_RELATIONS = 'public_relations',
	REFERRAL = 'referral',
	SOCIAL_MEDIA = 'social_media',
}

export interface RecurlyAccountAcquisitionListResponse {
	object?: string
	has_more?: boolean
	next?: string
	data?: RecurlyAccountAcquisition[]
}
