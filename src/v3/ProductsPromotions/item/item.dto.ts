import { RecurlyRevenueScheduleType } from './item.types'
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
	Matches,
	Min,
} from 'class-validator'

// List Items Query DTO
export class RecurlyListItemsQueryDto {
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
	@Matches(/^[a-z0-9_-]+$/i)
	name!: string

	@IsString()
	@MaxLength(255)
	value!: string
}

// Pricing DTO
export class RecurlyPricingDto {
	@IsString()
	currency!: string

	@IsNumber()
	unit_amount!: number

	@IsOptional()
	@IsBoolean()
	tax_inclusive?: boolean
}

// Create Item DTO
export class RecurlyCreateItemDto {
	@IsString()
	@MaxLength(50)
	@Matches(/^[a-z0-9_+-]+$/)
	code!: string

	@IsString()
	@MaxLength(255)
	name!: string

	@IsOptional()
	@IsString()
	description?: string

	@IsOptional()
	@IsString()
	@MaxLength(50)
	external_sku?: string

	@IsOptional()
	@IsString()
	@MaxLength(20)
	@Matches(/^[a-z0-9_+-]+$/)
	accounting_code?: string

	@IsOptional()
	@IsEnum(['at_range_end', 'at_range_start', 'evenly', 'never'])
	revenue_schedule_type?: RecurlyRevenueScheduleType

	@IsOptional()
	@IsString()
	@MaxLength(13)
	performance_obligation_id?: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	liability_gl_account_id?: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	revenue_gl_account_id?: string

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
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyCustomFieldDto)
	custom_fields?: RecurlyCustomFieldDto[]

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyPricingDto)
	currencies?: RecurlyPricingDto[]
}

// Update Item DTO
export class RecurlyUpdateItemDto {
	@IsOptional()
	@IsString()
	@MaxLength(50)
	@Matches(/^[a-z0-9_+-]+$/)
	code?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	name?: string

	@IsOptional()
	@IsString()
	description?: string

	@IsOptional()
	@IsString()
	@MaxLength(50)
	external_sku?: string

	@IsOptional()
	@IsString()
	@MaxLength(20)
	@Matches(/^[a-z0-9_+-]+$/)
	accounting_code?: string

	@IsOptional()
	@IsEnum(['at_range_end', 'at_range_start', 'evenly', 'never'])
	revenue_schedule_type?: RecurlyRevenueScheduleType

	@IsOptional()
	@IsString()
	@MaxLength(13)
	performance_obligation_id?: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	liability_gl_account_id?: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	revenue_gl_account_id?: string

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
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyCustomFieldDto)
	custom_fields?: RecurlyCustomFieldDto[]

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyPricingDto)
	currencies?: RecurlyPricingDto[]
}
