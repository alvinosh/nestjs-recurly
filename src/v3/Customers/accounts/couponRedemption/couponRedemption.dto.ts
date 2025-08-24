import { Type } from 'class-transformer'
import { IsString, IsOptional, IsArray, IsNumber, IsDateString } from 'class-validator'

export class RecurlyListCouponRedemptionsQueryDto {
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	ids?: string[]

	@IsOptional()
	@IsString()
	sort?: 'created_at' | 'updated_at'

	@IsOptional()
	@IsDateString()
	begin_time?: string

	@IsOptional()
	@IsDateString()
	end_time?: string

	@IsOptional()
	@IsString()
	state?: string

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	limit?: number

	@IsOptional()
	@IsString()
	order?: 'asc' | 'desc'
}

export class RecurlyCouponRedemptionCreateDto {
	@IsString()
	coupon_id!: string

	@IsOptional()
	@IsString()
	currency?: string

	@IsOptional()
	@IsString()
	subscription_id?: string
}
