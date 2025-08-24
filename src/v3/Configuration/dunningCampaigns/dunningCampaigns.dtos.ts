import { IsArray, IsOptional, IsString, IsEnum, IsDateString, IsNumber, MaxLength } from 'class-validator'

// List Dunning Campaigns Query DTO
export class RecurlyListDunningCampaignsQueryDto {
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

	@IsOptional()
	@IsEnum(['asc', 'desc'])
	order?: 'asc' | 'desc'
}

// Dunning Campaigns Bulk Update DTO
export class RecurlyDunningCampaignsBulkUpdateDto {
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	@MaxLength(200, { each: true, message: 'Maximum 200 plan codes allowed' })
	plan_codes?: string[]

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	@MaxLength(200, { each: true, message: 'Maximum 200 plan IDs allowed' })
	plan_ids?: string[]
}
