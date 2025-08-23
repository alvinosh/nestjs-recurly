import { RecurlyCollectionMethod, RecurlyTransactionType } from '../accounts/billing/info/info.types'
import {
	RecurlyNetTermsType,
	RecurlyRefundMethod,
	RecurlyRefundType,
	RecurlyInvoiceState,
	RecurlyInvoiceType,
} from './invoice.types'
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

// List Invoices Query DTO
export class RecurlyListInvoicesQueryDto {
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
	@IsEnum(['charge', 'credit', 'legacy'])
	type?: RecurlyInvoiceType

	@IsOptional()
	@IsEnum(['open', 'pending', 'processing', 'past_due', 'paid', 'closed', 'failed', 'voided'])
	state?: RecurlyInvoiceState
}

// List Account Invoices Query DTO
export class RecurlyListAccountInvoicesQueryDto extends RecurlyListInvoicesQueryDto {}

// List Subscription Invoices Query DTO
export class RecurlyListSubscriptionInvoicesQueryDto extends RecurlyListInvoicesQueryDto {}

// List Business Entity Invoices Query DTO
export class RecurlyListBusinessEntityInvoicesQueryDto extends RecurlyListInvoicesQueryDto {}

// Invoice Address DTO
export class RecurlyInvoiceAddressDto {
	@IsOptional()
	@IsString()
	name_on_account?: string

	@IsOptional()
	@IsString()
	company?: string

	@IsOptional()
	@IsString()
	phone?: string

	@IsOptional()
	@IsString()
	street1?: string

	@IsOptional()
	@IsString()
	street2?: string

	@IsOptional()
	@IsString()
	city?: string

	@IsOptional()
	@IsString()
	region?: string

	@IsOptional()
	@IsString()
	postal_code?: string

	@IsOptional()
	@IsString()
	country?: string

	@IsOptional()
	@IsString()
	first_name?: string

	@IsOptional()
	@IsString()
	last_name?: string
}

// Create Invoice DTO
export class RecurlyCreateInvoiceDto {
	@IsString()
	@MaxLength(3)
	currency!: string

	@IsOptional()
	@IsString()
	business_entity_id?: string

	@IsOptional()
	@IsString()
	business_entity_code?: string

	@IsOptional()
	@IsEnum(['automatic', 'manual'])
	collection_method?: RecurlyCollectionMethod

	@IsOptional()
	@IsString()
	charge_customer_notes?: string

	@IsOptional()
	@IsString()
	credit_customer_notes?: string

	@IsOptional()
	@IsNumber()
	@Min(0)
	net_terms?: number

	@IsOptional()
	@IsEnum(['net', 'eom'])
	net_terms_type?: RecurlyNetTermsType

	@IsOptional()
	@IsString()
	@MaxLength(50)
	po_number?: string

	@IsOptional()
	@IsString()
	terms_and_conditions?: string

	@IsOptional()
	@IsString()
	vat_reverse_charge_notes?: string
}

// Update Invoice DTO
export class RecurlyUpdateInvoiceDto {
	@IsOptional()
	@IsString()
	@MaxLength(50)
	po_number?: string

	@IsOptional()
	@IsString()
	vat_reverse_charge_notes?: string

	@IsOptional()
	@IsString()
	terms_and_conditions?: string

	@IsOptional()
	@IsString()
	customer_notes?: string

	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(999)
	net_terms?: number

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlyInvoiceAddressDto)
	address?: RecurlyInvoiceAddressDto

	@IsOptional()
	@IsString()
	gateway_code?: string
}

// Collect Invoice DTO
export class RecurlyCollectInvoiceDto {
	@IsOptional()
	@IsString()
	@MaxLength(22)
	three_d_secure_action_result_token_id?: string

	@IsOptional()
	@IsEnum(['moto'])
	transaction_type?: RecurlyTransactionType

	@IsOptional()
	@IsString()
	billing_info_id?: string
}

// External Refund DTO
export class RecurlyExternalRefundDto {
	@IsOptional()
	@IsString()
	payment_method?: string

	@IsOptional()
	@IsString()
	description?: string

	@IsOptional()
	@IsDateString()
	refunded_at?: string
}

// Line Item Refund DTO
export class RecurlyLineItemRefundDto {
	@IsString()
	id!: string

	@IsOptional()
	@IsNumber()
	quantity?: number

	@IsOptional()
	@IsString()
	quantity_decimal?: string

	@IsOptional()
	@IsBoolean()
	prorate?: boolean

	@IsOptional()
	@IsNumber()
	@Min(1)
	@Max(100)
	percentage?: number
}

// Refund Invoice DTO
export class RecurlyRefundInvoiceDto {
	@IsEnum(['amount', 'percentage', 'line_items'])
	type!: RecurlyRefundType

	@IsOptional()
	@IsNumber()
	amount?: number

	@IsOptional()
	@IsNumber()
	@Min(1)
	@Max(100)
	percentage?: number

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyLineItemRefundDto)
	line_items?: RecurlyLineItemRefundDto[]

	@IsOptional()
	@IsEnum(['all_credit', 'all_transaction', 'credit_first', 'transaction_first'])
	refund_method?: RecurlyRefundMethod

	@IsOptional()
	@IsString()
	credit_customer_notes?: string

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlyExternalRefundDto)
	external_refund?: RecurlyExternalRefundDto
}

// External Invoice Create DTO
export class RecurlyCreateExternalInvoiceDto {
	@IsString()
	external_id!: string

	@IsString()
	currency!: string

	@IsDateString()
	purchased_at!: string

	@IsOptional()
	@IsArray()
	line_items?: any[]
}

// List Line Items Query DTO
export class RecurlyListLineItemsQueryDto {
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
	@IsString()
	original?: string

	@IsOptional()
	@IsEnum(['charge', 'credit'])
	type?: string

	@IsOptional()
	@IsString()
	tax_exempt?: string
}

// List Transactions Query DTO
export class RecurlyListTransactionsQueryDto {
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
	@IsString()
	original?: string

	@IsOptional()
	@IsString()
	state?: string

	@IsOptional()
	@IsString()
	type?: string

	@IsOptional()
	@IsBoolean()
	success?: boolean
}
