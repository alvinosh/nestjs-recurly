import { RecurlyExternalSubscriptionState } from './externalSubscription.types'
import { IsOptional, IsString, IsEnum, IsNumber, IsDateString, IsBoolean } from 'class-validator'

// List External Subscriptions Query DTO
export class RecurlyListExternalSubscriptionsQueryDto {
	@IsOptional()
	@IsEnum(['asc', 'desc'])
	order?: 'asc' | 'desc'

	@IsOptional()
	@IsEnum(['created_at', 'updated_at'])
	sort?: 'created_at' | 'updated_at'

	@IsOptional()
	@IsDateString()
	begin_time?: string

	@IsOptional()
	@IsDateString()
	end_time?: string
}

// Account for External Subscription Creation
export class RecurlyAccountExternalSubscriptionDto {
	@IsOptional()
	@IsString()
	id?: string

	@IsOptional()
	@IsString()
	code?: string
}

// External Product Reference for Creation
export class RecurlyExternalProductReferenceCreateDto {
	@IsString()
	reference_code!: string

	@IsString()
	external_connection_type!: string
}

// External Product Reference for Update
export class RecurlyExternalProductReferenceUpdateDto {
	@IsOptional()
	@IsString()
	reference_code?: string

	@IsOptional()
	@IsString()
	external_connection_type?: string
}

// Create External Subscription DTO
export class RecurlyCreateExternalSubscriptionDto {
	@IsOptional()
	account?: RecurlyAccountExternalSubscriptionDto

	external_product_reference!: RecurlyExternalProductReferenceCreateDto

	@IsString()
	external_id!: string

	@IsOptional()
	@IsDateString()
	last_purchased?: string

	@IsOptional()
	@IsBoolean()
	auto_renew?: boolean

	@IsOptional()
	@IsEnum(['active', 'canceled', 'expired', 'past_due', 'voided', 'revoked', 'paused'])
	state?: RecurlyExternalSubscriptionState

	@IsOptional()
	@IsString()
	app_identifier?: string

	@IsOptional()
	@IsNumber()
	quantity?: number

	@IsOptional()
	@IsDateString()
	activated_at?: string

	@IsOptional()
	@IsDateString()
	expires_at?: string

	@IsOptional()
	@IsDateString()
	trial_started_at?: string

	@IsOptional()
	@IsDateString()
	trial_ends_at?: string

	@IsOptional()
	@IsBoolean()
	imported?: boolean
}

// Update External Subscription DTO
export class RecurlyUpdateExternalSubscriptionDto {
	@IsOptional()
	external_product_reference?: RecurlyExternalProductReferenceUpdateDto

	@IsOptional()
	@IsString()
	external_id?: string

	@IsOptional()
	@IsDateString()
	last_purchased?: string

	@IsOptional()
	@IsBoolean()
	auto_renew?: boolean

	@IsOptional()
	@IsEnum(['active', 'canceled', 'expired', 'past_due', 'voided', 'revoked', 'paused'])
	state?: RecurlyExternalSubscriptionState

	@IsOptional()
	@IsString()
	app_identifier?: string

	@IsOptional()
	@IsNumber()
	quantity?: number

	@IsOptional()
	@IsDateString()
	activated_at?: string

	@IsOptional()
	@IsDateString()
	expires_at?: string

	@IsOptional()
	@IsDateString()
	trial_started_at?: string

	@IsOptional()
	@IsDateString()
	trial_ends_at?: string

	@IsOptional()
	@IsBoolean()
	imported?: boolean
}
