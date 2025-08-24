import {
	RecurlyPricingModel,
	RecurlyIntervalUnit,
	RecurlyTrialUnit,
	RecurlyRevenueScheduleType,
	RecurlyVertexTransactionType,
} from './plan.types'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsBoolean,
	IsOptional,
	IsString,
	IsEnum,
	IsNumber,
	ValidateNested,
	IsDateString,
	MaxLength,
	Min,
	Max,
} from 'class-validator'

// List Plans Query DTO
export class RecurlyListPlansQueryDto {
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
	@IsEnum(['created_at', 'updated_at'])
	sort?: 'created_at' | 'updated_at'

	@IsOptional()
	@IsDateString()
	begin_time?: string

	@IsOptional()
	@IsDateString()
	end_time?: string

	@IsOptional()
	@IsEnum(['active', 'inactive'])
	state?: 'active' | 'inactive'
}

// Custom Field DTO
export class RecurlyCustomFieldDto {
	@IsString()
	@MaxLength(50)
	name!: string

	@IsString()
	@MaxLength(255)
	value!: string
}

// Plan Pricing DTO
export class RecurlyPlanPricingDto {
	@IsString()
	@MaxLength(3)
	currency!: string

	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(1000000)
	setup_fee?: number

	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(1000000)
	unit_amount?: number

	@IsOptional()
	@IsString()
	@MaxLength(55)
	price_segment_id?: string

	@IsOptional()
	@IsBoolean()
	tax_inclusive?: boolean
}

// Plan Setup Pricing DTO
export class RecurlyPlanSetupPricingDto {
	@IsString()
	@MaxLength(3)
	currency!: string

	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(1000000)
	unit_amount?: number
}

// Plan Ramp Pricing DTO
export class RecurlyPlanRampPricingDto {
	@IsString()
	@MaxLength(3)
	currency!: string

	@IsNumber()
	@Min(0)
	@Max(1000000)
	unit_amount!: number

	@IsOptional()
	@IsString()
	@MaxLength(55)
	price_segment_id?: string
}

// Plan Ramp Interval DTO
export class RecurlyPlanRampIntervalDto {
	@IsOptional()
	@IsNumber()
	@Min(1)
	starting_billing_cycle?: number

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyPlanRampPricingDto)
	currencies?: RecurlyPlanRampPricingDto[]
}

// Plan Hosted Pages DTO
export class RecurlyPlanHostedPagesDto {
	@IsOptional()
	@IsString()
	success_url?: string

	@IsOptional()
	@IsString()
	cancel_url?: string

	@IsOptional()
	@IsBoolean()
	bypass_confirmation?: boolean

	@IsOptional()
	@IsBoolean()
	display_quantity?: boolean
}

// Create Plan DTO
export class RecurlyCreatePlanDto {
	@IsString()
	@MaxLength(50)
	code!: string

	@IsString()
	@MaxLength(255)
	name!: string

	@IsOptional()
	@IsEnum(['fixed', 'ramp'])
	pricing_model?: RecurlyPricingModel

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyPlanPricingDto)
	currencies?: RecurlyPlanPricingDto[]

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyPlanRampIntervalDto)
	ramp_intervals?: RecurlyPlanRampIntervalDto[]

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyPlanSetupPricingDto)
	setup_fees?: RecurlyPlanSetupPricingDto[]

	@IsOptional()
	@IsEnum(['days', 'months'])
	interval_unit?: RecurlyIntervalUnit

	@IsOptional()
	@IsNumber()
	@Min(1)
	interval_length?: number

	@IsOptional()
	@IsString()
	description?: string

	@IsOptional()
	@IsString()
	@MaxLength(20)
	accounting_code?: string

	@IsOptional()
	@IsEnum(['at_range_end', 'at_range_start', 'evenly', 'never'])
	revenue_schedule_type?: RecurlyRevenueScheduleType

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
	setup_fee_accounting_code?: string

	@IsOptional()
	@IsEnum(['at_range_end', 'at_range_start', 'evenly', 'never'])
	setup_fee_revenue_schedule_type?: RecurlyRevenueScheduleType

	@IsOptional()
	@IsString()
	@MaxLength(13)
	setup_fee_liability_gl_account_id?: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	setup_fee_revenue_gl_account_id?: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	setup_fee_performance_obligation_id?: string

	@IsOptional()
	@IsEnum(['days', 'months'])
	trial_unit?: RecurlyTrialUnit

	@IsOptional()
	@IsNumber()
	@Min(0)
	trial_length?: number

	@IsOptional()
	@IsBoolean()
	trial_requires_billing_info?: boolean

	@IsOptional()
	@IsNumber()
	@Min(0)
	total_billing_cycles?: number

	@IsOptional()
	@IsBoolean()
	auto_renew?: boolean

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyCustomFieldDto)
	custom_fields?: RecurlyCustomFieldDto[]

	@IsOptional()
	@IsNumber()
	@Min(0)
	avalara_transaction_type?: number

	@IsOptional()
	@IsNumber()
	@Min(0)
	avalara_service_type?: number

	@IsOptional()
	@IsString()
	@MaxLength(50)
	tax_code?: string

	@IsOptional()
	@IsBoolean()
	tax_exempt?: boolean

	@IsOptional()
	@IsEnum(['sale', 'rental', 'lease'])
	vertex_transaction_type?: RecurlyVertexTransactionType

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlyPlanHostedPagesDto)
	hosted_pages?: RecurlyPlanHostedPagesDto

	@IsOptional()
	@IsBoolean()
	allow_any_item_on_subscriptions?: boolean

	@IsOptional()
	@IsString()
	dunning_campaign_id?: string
}

// Update Plan DTO
export class RecurlyUpdatePlanDto {
	@IsOptional()
	@IsString()
	@MaxLength(50)
	code?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	name?: string

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyPlanPricingDto)
	currencies?: RecurlyPlanPricingDto[]

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyPlanRampIntervalDto)
	ramp_intervals?: RecurlyPlanRampIntervalDto[]

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyPlanSetupPricingDto)
	setup_fees?: RecurlyPlanSetupPricingDto[]

	@IsOptional()
	@IsString()
	description?: string

	@IsOptional()
	@IsString()
	@MaxLength(20)
	accounting_code?: string

	@IsOptional()
	@IsEnum(['at_range_end', 'at_range_start', 'evenly', 'never'])
	revenue_schedule_type?: RecurlyRevenueScheduleType

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
	setup_fee_accounting_code?: string

	@IsOptional()
	@IsEnum(['at_range_end', 'at_range_start', 'evenly', 'never'])
	setup_fee_revenue_schedule_type?: RecurlyRevenueScheduleType

	@IsOptional()
	@IsString()
	@MaxLength(13)
	setup_fee_liability_gl_account_id?: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	setup_fee_revenue_gl_account_id?: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	setup_fee_performance_obligation_id?: string

	@IsOptional()
	@IsEnum(['days', 'months'])
	trial_unit?: RecurlyTrialUnit

	@IsOptional()
	@IsNumber()
	@Min(0)
	trial_length?: number

	@IsOptional()
	@IsBoolean()
	trial_requires_billing_info?: boolean

	@IsOptional()
	@IsNumber()
	@Min(0)
	total_billing_cycles?: number

	@IsOptional()
	@IsBoolean()
	auto_renew?: boolean

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyCustomFieldDto)
	custom_fields?: RecurlyCustomFieldDto[]

	@IsOptional()
	@IsNumber()
	@Min(0)
	avalara_transaction_type?: number

	@IsOptional()
	@IsNumber()
	@Min(0)
	avalara_service_type?: number

	@IsOptional()
	@IsString()
	@MaxLength(50)
	tax_code?: string

	@IsOptional()
	@IsBoolean()
	tax_exempt?: boolean

	@IsOptional()
	@IsEnum(['sale', 'rental', 'lease'])
	vertex_transaction_type?: RecurlyVertexTransactionType

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlyPlanHostedPagesDto)
	hosted_pages?: RecurlyPlanHostedPagesDto

	@IsOptional()
	@IsBoolean()
	allow_any_item_on_subscriptions?: boolean

	@IsOptional()
	@IsString()
	dunning_campaign_id?: string
}
