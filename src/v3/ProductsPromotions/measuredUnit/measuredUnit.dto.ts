import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Matches, Max, MaxLength, Min } from 'class-validator'

export class RecurlyListMeasuredUnitsQueryDto {
	@IsOptional()
	@IsString()
	ids?: string

	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(200)
	limit?: number

	@IsOptional()
	@IsString()
	order?: string

	@IsOptional()
	@IsString()
	sort?: string

	@IsOptional()
	@IsString()
	begin_time?: string

	@IsOptional()
	@IsString()
	end_time?: string

	@IsOptional()
	@IsEnum(['active', 'inactive'])
	state?: 'active' | 'inactive'
}

export class RecurlyCreateMeasuredUnitDto {
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	name!: string

	@IsNotEmpty()
	@IsString()
	@MaxLength(50)
	@Matches(/^[\w ]+$/, { message: 'Display name can only contain spaces, underscores and must be alphanumeric' })
	display_name!: string

	@IsOptional()
	@IsString()
	description?: string
}

export class RecurlyUpdateMeasuredUnitDto {
	@IsOptional()
	@IsString()
	@MaxLength(255)
	name?: string

	@IsOptional()
	@IsString()
	@MaxLength(50)
	@Matches(/^[\w ]+$/, { message: 'Display name can only contain spaces, underscores and must be alphanumeric' })
	display_name?: string

	@IsOptional()
	@IsString()
	description?: string
}
