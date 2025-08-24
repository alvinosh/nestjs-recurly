import { IsArray, IsOptional, IsString, IsEnum, IsNumber, IsDateString } from 'class-validator'

// List Business Entities Query DTO (no specific parameters in the spec)
export class RecurlyListBusinessEntitiesQueryDto {
	// Business entities endpoint doesn't specify any query parameters in the API spec
	// but including common pagination parameters for consistency
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

// Note: Business entities endpoints in Recurly API are read-only
// The API documentation shows only GET operations (list_business_entities, get_business_entity, and list_business_entity_invoices)
// No create, update, or delete operations are available for business entities
// Business entities are managed through the Recurly dashboard
//
// For listing business entity invoices, use RecurlyListBusinessEntityInvoicesQueryDto from the invoice module
