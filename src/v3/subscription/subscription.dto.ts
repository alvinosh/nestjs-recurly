import { Type } from 'class-transformer'
import {
	IsArray,
	IsBoolean,
	IsDateString,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator'

// List Subscriptions Query DTO
export class RecurlyListSubscriptionsQueryDto {
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	ids?: string[]

	@IsOptional()
	@IsNumber()
	limit?: number

	@IsOptional()
	@IsEnum(['asc', 'desc'])
	order?: 'asc' | 'desc'

	@IsOptional()
	@IsEnum(['updated_at', 'created_at'])
	sort?: 'updated_at' | 'created_at'

	@IsOptional()
	@IsDateString()
	begin_time?: string

	@IsOptional()
	@IsDateString()
	end_time?: string

	@IsOptional()
	@IsArray()
	@IsEnum(['active', 'canceled', 'expired', 'future', 'in_trial', 'paused'], { each: true })
	state?: ('active' | 'canceled' | 'expired' | 'future' | 'in_trial' | 'paused')[]
}

// Create Subscription DTO
export class RecurlySubscriptionCreateDto {
	@IsOptional()
	@IsString()
	plan_code?: string

	@IsOptional()
	@IsString()
	plan_id?: string

	@IsOptional()
	@IsString()
	business_entity_id?: string

	@IsOptional()
	@IsString()
	business_entity_code?: string

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlyAccountCreateDto)
	account?: RecurlyAccountCreateDto

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlyPriceSegmentIdDto)
	price_segment_id?: RecurlyPriceSegmentIdDto

	@IsOptional()
	@IsString()
	billing_info_id?: string

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlySubscriptionShippingCreateDto)
	shipping?: RecurlySubscriptionShippingCreateDto

	@IsOptional()
	@IsEnum(['automatic', 'manual'])
	collection_method?: 'automatic' | 'manual'

	@IsString()
	currency!: string

	@IsOptional()
	@IsNumber()
	unit_amount?: number

	@IsOptional()
	@IsBoolean()
	tax_inclusive?: boolean

	@IsOptional()
	@IsNumber()
	quantity?: number

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlySubscriptionAddOnCreateDto)
	add_ons?: RecurlySubscriptionAddOnCreateDto[]

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	coupon_codes?: string[]

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyCustomFieldDto)
	custom_fields?: RecurlyCustomFieldDto[]

	@IsOptional()
	@IsDateString()
	trial_ends_at?: string

	@IsOptional()
	@IsDateString()
	starts_at?: string

	@IsOptional()
	@IsDateString()
	next_bill_date?: string

	@IsOptional()
	@IsNumber()
	total_billing_cycles?: number

	@IsOptional()
	@IsNumber()
	renewal_billing_cycles?: number

	@IsOptional()
	@IsBoolean()
	auto_renew?: boolean

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlySubscriptionRampIntervalDto)
	ramp_intervals?: RecurlySubscriptionRampIntervalDto[]

	@IsOptional()
	@IsEnum(['at_range_end', 'at_range_start', 'evenly', 'never'])
	revenue_schedule_type?: 'at_range_end' | 'at_range_start' | 'evenly' | 'never'

	@IsOptional()
	@IsString()
	po_number?: string

	@IsOptional()
	@IsNumber()
	net_terms?: number

	@IsOptional()
	@IsEnum(['net', 'eom'])
	net_terms_type?: 'net' | 'eom'

	@IsOptional()
	@IsString()
	terms_and_conditions?: string

	@IsOptional()
	@IsString()
	customer_notes?: string

	@IsOptional()
	@IsString()
	gateway_code?: string

	@IsOptional()
	@IsString()
	transaction_type?: string
}

// Update Subscription DTO
export class RecurlySubscriptionUpdateDto {
	@IsOptional()
	@IsEnum(['automatic', 'manual'])
	collection_method?: 'automatic' | 'manual'

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyCustomFieldDto)
	custom_fields?: RecurlyCustomFieldDto[]

	@IsOptional()
	@IsNumber()
	remaining_billing_cycles?: number

	@IsOptional()
	@IsNumber()
	renewal_billing_cycles?: number

	@IsOptional()
	@IsBoolean()
	auto_renew?: boolean

	@IsOptional()
	@IsDateString()
	next_bill_date?: string

	@IsOptional()
	@IsEnum(['at_range_end', 'at_range_start', 'evenly', 'never'])
	revenue_schedule_type?: 'at_range_end' | 'at_range_start' | 'evenly' | 'never'

	@IsOptional()
	@IsString()
	terms_and_conditions?: string

	@IsOptional()
	@IsString()
	customer_notes?: string

	@IsOptional()
	@IsString()
	po_number?: string

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlyPriceSegmentIdDto)
	price_segment_id?: RecurlyPriceSegmentIdDto

	@IsOptional()
	@IsNumber()
	net_terms?: number

	@IsOptional()
	@IsEnum(['net', 'eom'])
	net_terms_type?: 'net' | 'eom'

	@IsOptional()
	@IsString()
	gateway_code?: string

	@IsOptional()
	@IsBoolean()
	tax_inclusive?: boolean

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlySubscriptionShippingUpdateDto)
	shipping?: RecurlySubscriptionShippingUpdateDto

	@IsOptional()
	@IsString()
	billing_info_id?: string
}

// Supporting DTOs
export class RecurlyAccountCreateDto {
	@IsString()
	code!: string

	@IsOptional()
	@IsString()
	email?: string

	@IsOptional()
	@IsString()
	first_name?: string

	@IsOptional()
	@IsString()
	last_name?: string

	@IsOptional()
	@IsString()
	company?: string
}

export class RecurlyPriceSegmentIdDto {
	@IsOptional()
	@IsString()
	id?: string

	@IsOptional()
	@IsString()
	code?: string
}

export class RecurlySubscriptionShippingCreateDto {
	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlyShippingAddressCreateDto)
	address?: RecurlyShippingAddressCreateDto

	@IsOptional()
	@IsString()
	address_id?: string

	@IsOptional()
	@IsString()
	method_code?: string

	@IsOptional()
	@IsString()
	method_id?: string

	@IsOptional()
	@IsNumber()
	amount?: number
}

export class RecurlyShippingAddressCreateDto {
	@IsOptional()
	@IsString()
	first_name?: string

	@IsOptional()
	@IsString()
	last_name?: string

	@IsOptional()
	@IsString()
	company?: string

	@IsOptional()
	@IsString()
	email?: string

	@IsOptional()
	@IsString()
	vat_number?: string

	@IsOptional()
	@IsString()
	phone?: string

	@IsString()
	street1!: string

	@IsOptional()
	@IsString()
	street2?: string

	@IsString()
	city!: string

	@IsOptional()
	@IsString()
	region?: string

	@IsString()
	postal_code!: string

	@IsString()
	country!: string

	@IsOptional()
	@IsString()
	geo_code?: string
}

export class RecurlySubscriptionAddOnCreateDto {
	@IsString()
	code!: string

	@IsOptional()
	@IsString()
	id?: string

	@IsOptional()
	@IsNumber()
	quantity?: number

	@IsOptional()
	@IsNumber()
	unit_amount?: number

	@IsOptional()
	@IsBoolean()
	tax_inclusive?: boolean

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyPercentageTierDto)
	percentage_tiers?: RecurlyPercentageTierDto[]

	@IsOptional()
	@IsEnum(['at_range_end', 'at_range_start', 'evenly', 'never'])
	revenue_schedule_type?: 'at_range_end' | 'at_range_start' | 'evenly' | 'never'
}

export class RecurlyPercentageTierDto {
	@IsOptional()
	@IsNumber()
	ending_amount?: number

	@IsString()
	usage_percentage!: string
}

export class RecurlyCustomFieldDto {
	@IsString()
	name!: string

	@IsString()
	value!: string
}

export class RecurlySubscriptionRampIntervalDto {
	@IsDateString()
	starting_on!: string

	@IsNumber()
	unit_amount!: number
}

export class RecurlySubscriptionShippingUpdateDto {
	@IsOptional()
	@IsString()
	method_code?: string

	@IsOptional()
	@IsString()
	method_id?: string

	@IsOptional()
	@IsNumber()
	amount?: number
}

// Cancel Subscription DTO
export class RecurlySubscriptionCancelDto {
	@IsOptional()
	@IsEnum(['bill_date', 'term_end'])
	timeframe?: 'bill_date' | 'term_end'
}

// Pause Subscription DTO
export class RecurlySubscriptionPauseDto {
	@IsNumber()
	remaining_pause_cycles!: number
}
