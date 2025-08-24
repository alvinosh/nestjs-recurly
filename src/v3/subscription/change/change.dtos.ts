import { RecurlyAddressDto } from '../../v3.dtos'
import { RecurlyCustomField } from '../../v3.types'
import { RecurlySubscriptionRampIntervalDto } from '../subscription.dto'
import { Expose, Type } from 'class-transformer'
import { IsArray, IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'

export class RecurlyProrationSettings {
	@IsEnum(['full_amount', 'prorated_amount', 'none'])
	@IsOptional()
	@Expose()
	charge?: 'full_amount' | 'prorated_amount' | 'none'

	@IsEnum(['full_amount', 'prorated_amount', 'none'])
	@IsOptional()
	@Expose()
	credit?: 'full_amount' | 'prorated_amount' | 'none'
}

export class RecurlySubscriptionChangeBillingInfoCreate {
	@IsString()
	@IsOptional()
	@Expose()
	three_d_secure_action_result_token_id?: string
}

export class RecurlySubscriptionChangeShippingCreate {
	@IsString()
	@IsOptional()
	@Expose()
	method_id?: string

	@IsString()
	@IsOptional()
	@Expose()
	method_code?: string

	@IsNumber()
	@IsOptional()
	@Expose()
	amount?: number

	@IsString()
	@IsOptional()
	@Expose()
	address_id?: string

	@ValidateNested()
	@IsOptional()
	@Expose()
	address?: RecurlyAddressDto
}

export class RecurlySubscriptionChangeCreate {
	@IsEnum(['bill_date', 'now', 'renewal', 'term_end'])
	@IsOptional()
	@Expose()
	timeframe?: 'bill_date' | 'now' | 'renewal' | 'term_end'

	@IsString()
	@IsOptional()
	@Expose()
	plan_id?: string

	@IsString()
	@IsOptional()
	@Expose()
	plan_code?: string

	@IsString()
	@IsOptional()
	@Expose()
	business_entity_id?: string

	@IsString()
	@IsOptional()
	@Expose()
	business_entity_code?: string

	@IsString()
	@IsOptional()
	@Expose()
	price_segment_id?: string

	@IsNumber()
	@IsOptional()
	@Expose()
	unit_amount?: number

	@IsBoolean()
	@IsOptional()
	@Expose()
	tax_inclusive?: boolean

	@IsInt()
	@IsOptional()
	@Expose()
	quantity?: number

	@ValidateNested()
	@Type(() => RecurlySubscriptionChangeShippingCreate)
	@IsOptional()
	@Expose()
	shipping?: RecurlySubscriptionChangeShippingCreate

	@IsArray()
	@IsOptional()
	@Expose()
	coupon_codes?: string[]

	@ValidateNested({ each: true })
	@IsArray()
	@IsOptional()
	@Expose()
	add_ons?: any[] //TODO: RecurlySubscriptionAddOnUpdate

	@IsEnum(['automatic', 'manual'])
	@IsOptional()
	@Expose()
	collection_method?: 'automatic' | 'manual'

	@IsEnum(['at_range_end', 'at_range_start', 'evenly', 'never'])
	@IsOptional()
	@Expose()
	revenue_schedule_type?: 'at_range_end' | 'at_range_start' | 'evenly' | 'never'

	@ValidateNested({ each: true })
	@IsArray()
	@IsOptional()
	@Expose()
	custom_fields?: RecurlyCustomField[]

	@IsString()
	@IsOptional()
	@Expose()
	po_number?: string

	@IsInt()
	@IsOptional()
	@Expose()
	net_terms?: number

	@IsEnum(['net', 'eom'])
	@IsOptional()
	@Expose()
	net_terms_type?: 'net' | 'eom'

	@IsEnum(['moto'])
	@IsOptional()
	@Expose()
	transaction_type?: 'moto'

	@ValidateNested()
	@Type(() => RecurlySubscriptionChangeBillingInfoCreate)
	@IsOptional()
	@Expose()
	billing_info?: RecurlySubscriptionChangeBillingInfoCreate

	@ValidateNested({ each: true })
	@IsArray()
	@IsOptional()
	@Expose()
	ramp_intervals?: RecurlySubscriptionRampIntervalDto[]

	@ValidateNested()
	@Type(() => RecurlyProrationSettings)
	@IsOptional()
	@Expose()
	proration_settings?: RecurlyProrationSettings
}
