import { IsArray, IsOptional, IsString } from 'class-validator'

// List Account Notes Query DTO
export class RecurlyListAccountNotesQueryDto {
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	ids?: string[]
}

// Since the API only shows GET endpoints, no create/update DTOs are needed
// The message field is required when creating notes through other means
