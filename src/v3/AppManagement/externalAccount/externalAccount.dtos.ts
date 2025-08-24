import { IsOptional, IsString } from 'class-validator'

// Create External Account DTO
export class RecurlyCreateExternalAccountDto {
	@IsString()
	external_account_code!: string

	@IsString()
	external_connection_type!: string
}

// Update External Account DTO
export class RecurlyUpdateExternalAccountDto {
	@IsOptional()
	@IsString()
	external_account_code?: string

	@IsOptional()
	@IsString()
	external_connection_type?: string
}
