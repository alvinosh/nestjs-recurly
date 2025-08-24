import { IsArray, IsOptional, IsString, IsEnum, IsNumber, IsDateString } from 'class-validator'

// List Custom Field Definitions Query DTO
export class RecurlyListCustomFieldDefinitionsQueryDto {
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
	@IsEnum(['account', 'item', 'plan', 'subscription', 'charge'])
	related_type?: 'account' | 'item' | 'plan' | 'subscription' | 'charge'
}

// Note: Custom Field Definition endpoints in Recurly API are read-only
// The API documentation shows only GET operations (list_custom_field_definitions and get_custom_field_definition)
// No create, update, or delete operations are available for custom field definitions
// Custom field definitions are managed through the Recurly dashboard
