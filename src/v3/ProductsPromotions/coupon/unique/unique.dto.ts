import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator'

export class RecurlyGenerateUniqueCouponCodesDto {
	@IsInt()
	@Min(1)
	number_of_unique_codes!: number
}

export class RecurlyListUniqueCouponCodesDto {
	@IsOptional()
	@IsString()
	ids?: string

	@IsOptional()
	@IsInt()
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
	@IsEnum(['true', 'false'])
	redeemed?: 'true' | 'false'
}
