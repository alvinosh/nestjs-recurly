import { RecurlyAPILocation } from '@/v3/v3.types'
import { IsOptional, IsString } from 'class-validator'

export class RecurlyConfigDto {
	@IsOptional()
	@IsString()
	RECURLY_API_KEY?: string

	@IsOptional()
	@IsString()
	RECURLY_ACCEPT_LANGUAGE?: string

	@IsOptional()
	@IsString()
	RECURLY_API_LOCATION?: RecurlyAPILocation
}
