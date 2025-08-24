import { RecurlyAccountAcquisitionChannel } from './acquisition.types'
import { Type } from 'class-transformer'
import { IsArray, IsDateString, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'

// Account Acquisition Cost DTO
export class RecurlyAccountAcquisitionCostDto {
	@IsString()
	currency!: string

	@IsNumber()
	amount!: number
}

// Create/Update Account Acquisition DTO
export class RecurlyAccountAcquisitionUpdateDto {
	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlyAccountAcquisitionCostDto)
	cost?: RecurlyAccountAcquisitionCostDto

	@IsOptional()
	@IsEnum(RecurlyAccountAcquisitionChannel)
	channel?: RecurlyAccountAcquisitionChannel

	@IsOptional()
	@IsString()
	subchannel?: string

	@IsOptional()
	@IsString()
	campaign?: string

	@IsOptional()
	@IsDateString()
	acquired_at?: string
}

// List Account Acquisition Query DTO
export class RecurlyListAccountAcquisitionQueryDto {
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	ids?: string[]

	@IsOptional()
	@IsNumber()
	limit?: number

	@IsOptional()
	@IsString()
	order?: string

	@IsOptional()
	@IsString()
	sort?: string

	@IsOptional()
	@IsDateString()
	begin_time?: string

	@IsOptional()
	@IsDateString()
	end_time?: string
}
