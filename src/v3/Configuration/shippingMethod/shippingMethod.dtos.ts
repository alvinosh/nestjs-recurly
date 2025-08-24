import { IsArray, IsOptional, IsString, IsEnum, IsNumber, IsDateString, Matches, MaxLength } from 'class-validator'

// List Shipping Methods Query DTO
export class RecurlyListShippingMethodsQueryDto {
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
}

// Create Shipping Method DTO
export class RecurlyCreateShippingMethodDto {
	@IsString()
	@Matches(/^[a-z0-9_+-]+$/i)
	@MaxLength(50)
	code!: string

	@IsString()
	@MaxLength(100)
	name!: string

	@IsOptional()
	@IsString()
	@MaxLength(20)
	accounting_code?: string

	@IsOptional()
	@IsString()
	@MaxLength(50)
	tax_code?: string

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
}

// Update Shipping Method DTO
export class RecurlyUpdateShippingMethodDto {
	@IsOptional()
	@IsString()
	@Matches(/^[a-z0-9_+-]+$/i)
	@MaxLength(50)
	code?: string

	@IsOptional()
	@IsString()
	@MaxLength(100)
	name?: string

	@IsOptional()
	@IsString()
	@MaxLength(20)
	accounting_code?: string

	@IsOptional()
	@IsString()
	@MaxLength(50)
	tax_code?: string

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
}
