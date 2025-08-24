import { IsArray, IsOptional, IsString, IsEnum, IsNumber, IsDateString } from 'class-validator'

// List Sites Query DTO
export class RecurlyListSitesQueryDto {
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
	@IsEnum(['active', 'inactive'])
	state?: 'active' | 'inactive'
}

// Note: Site endpoints in Recurly API are read-only
// The API documentation shows only GET operations (list_sites and get_site)
// No create, update, or delete operations are available for sites
// Sites are managed through the Recurly dashboard
