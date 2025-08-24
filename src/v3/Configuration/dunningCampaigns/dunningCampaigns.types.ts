import { RecurlyPlan } from '@/v3/ProductsPromotions/plan/plan.types'

// Enums
export type RecurlyDunningCycleType = 'automatic' | 'manual' | 'trial'

// DunningInterval interface
export interface RecurlyDunningInterval {
	days?: number
	email_template?: string
}

// DunningCycle interface
export interface RecurlyDunningCycle {
	type?: RecurlyDunningCycleType
	applies_to_manual_trial?: boolean
	first_communication_interval?: number
	send_immediately_on_hard_decline?: boolean
	intervals?: RecurlyDunningInterval[]
	expire_subscription?: boolean
	fail_invoice?: boolean
	total_dunning_days?: number
	total_recycling_days?: number
	version?: number
	created_at?: string
	updated_at?: string
}

// DunningCampaign interface
export interface RecurlyDunningCampaign {
	id?: string
	object?: string
	code?: string
	name?: string
	description?: string
	default_campaign?: boolean
	dunning_cycles?: RecurlyDunningCycle[]
	created_at?: string
	updated_at?: string
	deleted_at?: string
}

// DunningCampaign List Response
export interface RecurlyDunningCampaignListResponse {
	object?: string
	has_more?: boolean
	next?: string
	data?: RecurlyDunningCampaign[]
}

// DunningCampaignsBulkUpdateResponse interface
export interface RecurlyDunningCampaignsBulkUpdateResponse {
	object?: string
	plans?: RecurlyPlan[]
}
