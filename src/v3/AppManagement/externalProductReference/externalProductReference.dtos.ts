import { IsOptional, IsString, IsEnum } from 'class-validator'

// List External Product References Query DTO
export class RecurlyListExternalProductReferencesQueryDto {
	@IsOptional()
	@IsEnum(['asc', 'desc'])
	order?: 'asc' | 'desc'

	@IsOptional()
	@IsEnum(['created_at', 'updated_at'])
	sort?: 'created_at' | 'updated_at'
}

// Create External Product Reference DTO
export class RecurlyCreateExternalProductReferenceDto {
	@IsString()
	reference_code!: string

	@IsString()
	external_connection_type!: string
}
