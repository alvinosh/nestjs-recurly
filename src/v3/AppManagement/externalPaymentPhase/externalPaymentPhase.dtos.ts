import { IsOptional, IsEnum } from 'class-validator'

// List External Payment Phases Query DTO
export class RecurlyListExternalPaymentPhasesQueryDto {
	@IsOptional()
	@IsEnum(['asc', 'desc'])
	order?: 'asc' | 'desc'

	@IsOptional()
	@IsEnum(['created_at', 'updated_at'])
	sort?: 'created_at' | 'updated_at'

	@IsOptional()
	limit?: number
}
