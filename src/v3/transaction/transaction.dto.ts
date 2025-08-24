import { RecurlyTransactionType } from './transaction.types'
import { IsArray, IsBoolean, IsOptional, IsString, IsEnum, IsNumber, IsDateString, Min, Max } from 'class-validator'

// List Transactions Query DTO
export class RecurlyListTransactionsQueryDto {
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	ids?: string[]

	@IsOptional()
	@IsNumber()
	@Min(1)
	@Max(200)
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
	@IsEnum(['authorization', 'capture', 'purchase', 'refund', 'verify'])
	type?: RecurlyTransactionType

	@IsOptional()
	@IsBoolean()
	success?: boolean
}

// List Account Transactions Query DTO
export class RecurlyListAccountTransactionsQueryDto extends RecurlyListTransactionsQueryDto {
	// Inherits all properties from RecurlyListTransactionsQueryDto
}

// List Invoice Transactions Query DTO
export class RecurlyListInvoiceTransactionsQueryDto {
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	ids?: string[]

	@IsOptional()
	@IsNumber()
	@Min(1)
	@Max(200)
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
	@IsEnum(['authorization', 'capture', 'purchase', 'refund', 'verify'])
	type?: RecurlyTransactionType

	@IsOptional()
	@IsBoolean()
	success?: boolean
}

// Payment Method DTO
export class RecurlyPaymentMethodDto {
	@IsOptional()
	@IsString()
	card_type?: string

	@IsOptional()
	@IsString()
	first_six?: string

	@IsOptional()
	@IsString()
	last_four?: string

	@IsOptional()
	@IsString()
	last_two?: string

	@IsOptional()
	@IsNumber()
	@Min(1)
	@Max(12)
	exp_month?: number

	@IsOptional()
	@IsNumber()
	@Min(2020)
	@Max(2050)
	exp_year?: number

	@IsOptional()
	@IsString()
	gateway_token?: string

	@IsOptional()
	@IsString()
	gateway_code?: string

	@IsOptional()
	@IsString()
	billing_agreement_id?: string

	@IsOptional()
	@IsString()
	name_on_account?: string

	@IsOptional()
	@IsString()
	account_type?: string

	@IsOptional()
	@IsString()
	routing_number?: string

	@IsOptional()
	@IsString()
	routing_number_bank?: string
}

// Note: Transactions are typically read-only in Recurly,
// they are created through other operations like purchases,
// subscriptions, or invoice collections. Therefore, we don't
// need create/update DTOs for transactions themselves.
