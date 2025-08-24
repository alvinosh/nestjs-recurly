import { IsOptional, IsString, IsEnum, IsNumber, IsDateString, Min, Max } from 'class-validator'

// List Credit Payments Query DTO (for site-level endpoint)
export class RecurlyListCreditPaymentsQueryDto {
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
}

// List Account Credit Payments Query DTO (for account-level endpoint)
export class RecurlyListAccountCreditPaymentsQueryDto {
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
}

// Get Credit Payment Path Parameters DTO
export class RecurlyGetCreditPaymentParamsDto {
	@IsString()
	credit_payment_id!: string
}

// Get Account Credit Payment Path Parameters DTO
export class RecurlyGetAccountCreditPaymentParamsDto {
	@IsString()
	account_id!: string
}
