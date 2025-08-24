import { RecurlyCurrency } from '../../v3.types'
import { Type } from 'class-transformer'
import { IsString, IsOptional, IsBoolean, IsNotEmpty, IsArray, IsNumber, IsEnum, IsDateString } from 'class-validator'

export class CouponListParamsDto {
	@IsOptional()
	@IsString()
	ids?: string

	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	limit?: number

	@IsOptional()
	@IsString()
	order?: 'asc' | 'desc'

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
}

export class CouponCreateDto {
	@IsNotEmpty()
	@IsString()
	code!: string

	@IsNotEmpty()
	@IsString()
	name!: string

	@IsOptional()
	@IsNumber()
	max_redemptions?: number

	@IsOptional()
	@IsNumber()
	max_redemptions_per_account?: number

	@IsOptional()
	@IsString()
	unique_code_template?: string

	@IsNotEmpty()
	@IsEnum(['forever', 'single_use', 'temporal'])
	duration!: 'forever' | 'single_use' | 'temporal'

	@IsOptional()
	@IsNumber()
	temporal_amount?: number

	@IsOptional()
	@IsEnum(['day', 'month', 'week', 'year'])
	temporal_unit?: 'day' | 'month' | 'week' | 'year'

	@IsNotEmpty()
	@IsEnum(['fixed', 'free_trial', 'percent'])
	discount_type!: 'fixed' | 'free_trial' | 'percent'

	@IsOptional()
	@IsNumber()
	discount_percent?: number

	@IsOptional()
	@IsEnum(['day', 'month', 'week'])
	free_trial_unit?: 'day' | 'month' | 'week'

	@IsOptional()
	@IsNumber()
	free_trial_amount?: number

	@IsOptional()
	@IsArray()
	@Type(() => Object)
	currencies?: RecurlyCurrency[]

	@IsOptional()
	@IsBoolean()
	applies_to_all_plans?: boolean

	@IsOptional()
	@IsBoolean()
	applies_to_all_items?: boolean

	@IsOptional()
	@IsBoolean()
	applies_to_non_plan_charges?: boolean

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	plan_codes?: string[]

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	item_codes?: string[]

	@IsOptional()
	@IsEnum(['account', 'subscription'])
	redemption_resource?: 'account' | 'subscription'

	@IsOptional()
	@IsEnum(['bulk', 'single_code'])
	coupon_type?: 'bulk' | 'single_code'

	@IsOptional()
	@IsString()
	hosted_description?: string

	@IsOptional()
	@IsString()
	invoice_description?: string

	@IsOptional()
	@IsString()
	redeem_by_date?: string
}

export class CouponUpdateDto {
	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@IsNumber()
	max_redemptions?: number

	@IsOptional()
	@IsNumber()
	max_redemptions_per_account?: number

	@IsOptional()
	@IsString()
	hosted_description?: string

	@IsOptional()
	@IsString()
	invoice_description?: string

	@IsOptional()
	@IsString()
	redeem_by_date?: string
}
