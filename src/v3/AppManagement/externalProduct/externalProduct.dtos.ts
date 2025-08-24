import { RecurlyExternalProductReferenceConnectionType } from './externalProduct.types'
import { Type } from 'class-transformer'
import { IsOptional, IsString, IsEnum, IsArray, ValidateNested } from 'class-validator'

// List External Products Query DTO
export class RecurlyListExternalProductsQueryDto {
	@IsOptional()
	@IsEnum(['asc', 'desc'])
	order?: 'asc' | 'desc'

	@IsOptional()
	@IsEnum(['created_at', 'updated_at'])
	sort?: 'created_at' | 'updated_at'

	@IsOptional()
	@IsString()
	begin_time?: string

	@IsOptional()
	@IsString()
	end_time?: string
}

// External Product Reference Base DTO
export class RecurlyExternalProductReferenceBaseDto {
	@IsOptional()
	@IsString()
	reference_code?: string

	@IsOptional()
	@IsString()
	external_connection_type?: RecurlyExternalProductReferenceConnectionType
}

// External Product Reference Create DTO
export class RecurlyExternalProductReferenceCreateDto {
	@IsString()
	reference_code!: string

	@IsString()
	external_connection_type!: RecurlyExternalProductReferenceConnectionType
}

// External Product Reference Update DTO
export class RecurlyExternalProductReferenceUpdateDto {
	@IsOptional()
	@IsString()
	reference_code?: string

	@IsOptional()
	@IsString()
	external_connection_type?: RecurlyExternalProductReferenceConnectionType
}

// Create External Product DTO
export class RecurlyCreateExternalProductDto {
	@IsString()
	name!: string

	@IsOptional()
	@IsString()
	plan_id?: string

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyExternalProductReferenceBaseDto)
	external_product_references?: RecurlyExternalProductReferenceBaseDto[]
}

// Update External Product DTO
export class RecurlyUpdateExternalProductDto {
	@IsString()
	plan_id!: string
}

// List External Product References Query DTO
export class RecurlyListExternalProductReferencesQueryDto {
	@IsOptional()
	@IsEnum(['asc', 'desc'])
	order?: 'asc' | 'desc'

	@IsOptional()
	@IsEnum(['created_at', 'updated_at'])
	sort?: 'created_at' | 'updated_at'

	@IsOptional()
	@IsString()
	begin_time?: string

	@IsOptional()
	@IsString()
	end_time?: string
}
