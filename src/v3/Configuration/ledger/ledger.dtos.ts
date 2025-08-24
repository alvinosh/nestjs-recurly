import { RecurlyGeneralLedgerAccountType } from './ledger.types'
import { IsArray, IsOptional, IsString, IsEnum, IsNumber, MaxLength, Matches } from 'class-validator'

// List General Ledger Accounts Query DTO
export class RecurlyListGeneralLedgerAccountsQueryDto {
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
	@IsEnum(['liability', 'revenue'])
	account_type?: RecurlyGeneralLedgerAccountType
}

// Create General Ledger Account DTO
export class RecurlyCreateGeneralLedgerAccountDto {
	@IsString()
	@MaxLength(255)
	@Matches(/^[A-Za-z0-9](( *)?[-A-Za-z0-9_.,:])*$/, {
		message:
			'Code must start with a letter or number and can only contain letters, numbers, spaces, and special characters: -_.,:',
	})
	code?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	description?: string

	@IsEnum(['liability', 'revenue'])
	account_type?: RecurlyGeneralLedgerAccountType
}

// Update General Ledger Account DTO
export class RecurlyUpdateGeneralLedgerAccountDto {
	@IsOptional()
	@IsString()
	@MaxLength(255)
	@Matches(/^[A-Za-z0-9](( *)?[-A-Za-z0-9_.,:])*$/, {
		message:
			'Code must start with a letter or number and can only contain letters, numbers, spaces, and special characters: -_.,:',
	})
	code?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	description?: string
}
