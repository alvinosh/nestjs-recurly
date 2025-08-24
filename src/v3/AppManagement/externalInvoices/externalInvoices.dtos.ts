import { RecurlyExternalInvoiceState } from './externalInvoices.types'
import { Type } from 'class-transformer'
import {
	IsOptional,
	IsString,
	IsEnum,
	IsNumber,
	IsDateString,
	IsArray,
	ValidateNested,
	IsNotEmpty,
} from 'class-validator'

// List External Invoices Query DTO
export class RecurlyListExternalInvoicesQueryDto {
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
	@IsNumber()
	limit?: number
}

// External Product Reference for Creation
export class RecurlyExternalProductReferenceCreateDto {
	@IsString()
	reference_code!: string

	@IsString()
	external_connection_type!: string
}

// External Charge Create DTO
export class RecurlyExternalChargeCreateDto {
	@IsString()
	currency!: string

	@IsString()
	unit_amount!: string

	@IsNumber()
	quantity!: number

	@IsOptional()
	@IsString()
	description?: string

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlyExternalProductReferenceCreateDto)
	external_product_reference?: RecurlyExternalProductReferenceCreateDto
}

// External Payment Phase Base DTO
export class RecurlyExternalPaymentPhaseBaseDto {
	@IsOptional()
	@IsDateString()
	started_at?: string

	@IsOptional()
	@IsDateString()
	ends_at?: string

	@IsOptional()
	@IsNumber()
	starting_billing_period_index?: number

	@IsOptional()
	@IsNumber()
	ending_billing_period_index?: number

	@IsOptional()
	@IsString()
	offer_type?: string
}

// Create External Invoice DTO
export class RecurlyCreateExternalInvoiceDto {
	@IsString()
	@IsNotEmpty()
	external_id!: string

	@IsEnum(['paid'])
	state!: RecurlyExternalInvoiceState

	@IsString()
	@IsNotEmpty()
	total!: string

	@IsString()
	@IsNotEmpty()
	currency!: string

	@IsDateString()
	purchased_at!: string

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyExternalChargeCreateDto)
	line_items?: RecurlyExternalChargeCreateDto[]

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlyExternalPaymentPhaseBaseDto)
	external_payment_phase?: RecurlyExternalPaymentPhaseBaseDto

	@IsOptional()
	@IsString()
	external_payment_phase_id?: string
}
