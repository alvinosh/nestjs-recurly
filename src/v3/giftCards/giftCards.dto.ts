import { RecurlyAccountPurchaseDto } from '../purchase/purchase.dto'
import { RecurlyAddressDto } from '../v3.dtos'
import { RecurlyGiftCardDeliveryMethod } from './giftCards.types'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsOptional,
	IsString,
	IsEnum,
	IsNumber,
	ValidateNested,
	IsDateString,
	MaxLength,
	Min,
	IsEmail,
} from 'class-validator'

// List Gift Cards Query DTO
export class RecurlyListGiftCardsQueryDto {
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

// Gift Card Delivery Create DTO
export class RecurlyGiftCardDeliveryCreateDto {
	@IsEnum(['email', 'post'])
	method!: RecurlyGiftCardDeliveryMethod

	@IsOptional()
	@IsEmail()
	email_address?: string

	@IsOptional()
	@IsDateString()
	deliver_at?: string

	@IsOptional()
	@IsString()
	first_name?: string

	@IsOptional()
	@IsString()
	last_name?: string

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlyAddressDto)
	recipient_address?: RecurlyAddressDto

	@IsOptional()
	@IsString()
	gifter_name?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	personal_message?: string
}

// Account Acquisition Cost DTO
export class RecurlyAccountAcquisitionCostDto {
	@IsOptional()
	@IsString()
	@MaxLength(3)
	currency?: string

	@IsOptional()
	@IsNumber()
	amount?: number
}

// Create Gift Card DTO
export class RecurlyCreateGiftCardDto {
	@IsString()
	product_code!: string

	@IsNumber()
	@Min(0)
	unit_amount!: number

	@IsString()
	@MaxLength(3)
	currency!: string

	@ValidateNested()
	@Type(() => RecurlyGiftCardDeliveryCreateDto)
	delivery!: RecurlyGiftCardDeliveryCreateDto

	@ValidateNested()
	@Type(() => RecurlyAccountPurchaseDto)
	gifter_account!: RecurlyAccountPurchaseDto
}

// Account Reference DTO (for recipient account)
export class RecurlyAccountReferenceDto {
	@IsOptional()
	@IsString()
	id?: string

	@IsOptional()
	@IsString()
	code?: string
}

// Redeem Gift Card DTO
export class RecurlyRedeemGiftCardDto {
	@ValidateNested()
	@Type(() => RecurlyAccountReferenceDto)
	recipient_account!: RecurlyAccountReferenceDto
}
