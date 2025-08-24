import { Type } from 'class-transformer'
import {
	IsArray,
	IsBoolean,
	IsEnum,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Max,
	MaxLength,
	Min,
	ValidateNested,
} from 'class-validator'

export class RecurlyAddOnPricingDto {
	@IsNotEmpty()
	@IsString()
	@MaxLength(3)
	currency!: string

	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(1000000)
	unit_amount?: number

	@IsOptional()
	@IsString()
	unit_amount_decimal?: string

	@IsOptional()
	@IsBoolean()
	tax_inclusive?: boolean
}

export class RecurlyListPlanAddOnsDto {
	@IsOptional()
	@IsString()
	ids?: string

	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(200)
	limit?: number

	@IsOptional()
	@IsString()
	order?: string

	@IsOptional()
	@IsString()
	sort?: string

	@IsOptional()
	@IsString()
	begin_time?: string

	@IsOptional()
	@IsString()
	end_time?: string

	@IsOptional()
	@IsString()
	state?: string
}

export class RecurlyCreatePlanAddOnDto {
	@IsOptional()
	@IsString()
	@MaxLength(50)
	item_code?: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	item_id?: string

	@IsOptional()
	@IsString()
	@MaxLength(50)
	code?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	name?: string

	@IsOptional()
	@IsEnum(['fixed', 'usage'])
	add_on_type?: 'fixed' | 'usage'

	@IsOptional()
	@IsEnum(['price', 'percentage'])
	usage_type?: 'price' | 'percentage'

	@IsOptional()
	@IsEnum(['cumulative', 'last_in_period'])
	usage_calculation_type?: 'cumulative' | 'last_in_period'

	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(100)
	usage_percentage?: number

	@IsOptional()
	@IsString()
	@MaxLength(13)
	measured_unit_id?: string

	@IsOptional()
	@IsString()
	measured_unit_name?: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	liability_gl_account_id?: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	revenue_gl_account_id?: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	performance_obligation_id?: string

	@IsOptional()
	@IsString()
	@MaxLength(20)
	accounting_code?: string

	@IsOptional()
	@IsEnum(['at_range_end', 'at_range_start', 'evenly', 'never'])
	revenue_schedule_type?: 'at_range_end' | 'at_range_start' | 'evenly' | 'never'

	@IsOptional()
	@IsBoolean()
	display_quantity?: boolean

	@IsOptional()
	@IsInt()
	default_quantity?: number

	@IsOptional()
	@IsBoolean()
	optional?: boolean

	@IsOptional()
	@IsInt()
	@Min(0)
	avalara_transaction_type?: number

	@IsOptional()
	@IsInt()
	@Min(0)
	avalara_service_type?: number

	@IsOptional()
	@IsString()
	@MaxLength(50)
	tax_code?: string

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyAddOnPricingDto)
	currencies?: RecurlyAddOnPricingDto[]

	@IsOptional()
	@IsEnum(['flat', 'tiered', 'stairstep', 'volume'])
	tier_type?: 'flat' | 'tiered' | 'stairstep' | 'volume'

	@IsOptional()
	@IsEnum(['billing_period', 'subscription_term'])
	usage_timeframe?: 'billing_period' | 'subscription_term'

	@IsOptional()
	@IsArray()
	tiers?: any[]

	@IsOptional()
	@IsArray()
	percentage_tiers?: any[]
}

export class RecurlyUpdatePlanAddOnDto {
	@IsOptional()
	@IsString()
	@MaxLength(50)
	code?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	name?: string

	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(100)
	usage_percentage?: number

	@IsOptional()
	@IsEnum(['cumulative', 'last_in_period'])
	usage_calculation_type?: 'cumulative' | 'last_in_period'

	@IsOptional()
	@IsString()
	@MaxLength(13)
	measured_unit_id?: string

	@IsOptional()
	@IsString()
	measured_unit_name?: string

	@IsOptional()
	@IsString()
	@MaxLength(20)
	accounting_code?: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	liability_gl_account_id?: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	revenue_gl_account_id?: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	performance_obligation_id?: string

	@IsOptional()
	@IsEnum(['at_range_end', 'at_range_start', 'evenly', 'never'])
	revenue_schedule_type?: 'at_range_end' | 'at_range_start' | 'evenly' | 'never'

	@IsOptional()
	@IsInt()
	@Min(0)
	avalara_transaction_type?: number

	@IsOptional()
	@IsInt()
	@Min(0)
	avalara_service_type?: number

	@IsOptional()
	@IsString()
	@MaxLength(50)
	tax_code?: string

	@IsOptional()
	@IsBoolean()
	display_quantity?: boolean

	@IsOptional()
	@IsInt()
	default_quantity?: number

	@IsOptional()
	@IsBoolean()
	optional?: boolean

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyAddOnPricingDto)
	currencies?: RecurlyAddOnPricingDto[]

	@IsOptional()
	@IsArray()
	tiers?: any[]

	@IsOptional()
	@IsArray()
	percentage_tiers?: any[]
}
