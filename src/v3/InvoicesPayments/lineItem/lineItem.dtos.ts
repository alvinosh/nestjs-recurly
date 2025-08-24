import {
	RecurlyLineItemType,
	RecurlyLineItemRevenueScheduleType,
	RecurlyLineItemCreditReasonCode,
} from './lineItem.types'
import { IsString, IsOptional, IsNumber, IsEnum, IsBoolean, IsInt, MaxLength } from 'class-validator'

export class RecurlyListLineItemsQueryDto {
	@IsOptional()
	@IsString()
	account_id?: string

	@IsOptional()
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
	@IsString()
	begin_time?: string

	@IsOptional()
	@IsString()
	end_time?: string

	@IsOptional()
	@IsEnum(['invoiced', 'pending'])
	state?: 'invoiced' | 'pending'

	@IsOptional()
	@IsEnum(['charge', 'credit'])
	type?: 'charge' | 'credit'

	@IsOptional()
	@IsBoolean()
	original?: boolean
}

export class RecurlyCreateLineItemDto {
	@IsString()
	currency!: string

	@IsNumber()
	unit_amount!: number

	@IsOptional()
	@IsBoolean()
	tax_inclusive?: boolean

	@IsOptional()
	@IsInt()
	quantity?: number

	@IsOptional()
	@MaxLength(255)
	description?: string

	@IsOptional()
	@IsString()
	item_code?: string

	@IsOptional()
	@IsString()
	item_id?: string

	@IsOptional()
	@IsEnum(['at_invoice', 'at_range_end', 'at_range_start', 'evenly', 'never'])
	revenue_schedule_type?: RecurlyLineItemRevenueScheduleType

	@IsOptional()
	@IsEnum(['charge', 'credit'])
	type?: RecurlyLineItemType

	@IsOptional()
	@IsEnum(['general', 'promotional', 'service'])
	credit_reason_code?: RecurlyLineItemCreditReasonCode

	@IsOptional()
	@IsString()
	accounting_code?: string

	@IsOptional()
	@IsString()
	liability_gl_account_id?: string

	@IsOptional()
	@IsString()
	revenue_gl_account_id?: string

	@IsOptional()
	@IsString()
	performance_obligation_id?: string

	@IsOptional()
	@IsBoolean()
	tax_exempt?: boolean

	@IsOptional()
	@IsNumber()
	avalara_transaction_type?: number

	@IsOptional()
	@IsNumber()
	avalara_service_type?: number

	@IsOptional()
	@IsString()
	tax_code?: string

	@IsOptional()
	@IsString()
	product_code?: string

	@IsOptional()
	@IsString()
	origin?: string

	@IsOptional()
	@IsString()
	start_date?: string

	@IsOptional()
	@IsString()
	end_date?: string

	@IsOptional()
	@IsString()
	origin_tax_address_source?: string

	@IsOptional()
	@IsString()
	destination_tax_address_source?: string
}
