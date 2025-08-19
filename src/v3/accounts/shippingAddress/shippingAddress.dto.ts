import { IsArray, IsEmail, IsOptional, IsString, MaxLength } from 'class-validator'

// List Shipping Addresses Query DTO
export class RecurlyListShippingAddressesQueryDto {
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	ids?: string[]

	@IsOptional()
	@IsString()
	limit?: string

	@IsOptional()
	@IsString()
	order?: string

	@IsOptional()
	@IsString()
	sort?: string

	@IsOptional()
	@IsString()
	begin_time?: string

	@IsOptional()
	@IsString()
	end_time?: string
}

// Create Shipping Address DTO
export class RecurlyAccountShippingAddressCreateDto {
	@IsOptional()
	@IsString()
	@MaxLength(255)
	nickname?: string

	@IsString()
	@MaxLength(255)
	first_name!: string

	@IsString()
	@MaxLength(255)
	last_name!: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	company?: string

	@IsOptional()
	@IsEmail()
	@MaxLength(255)
	email?: string

	@IsOptional()
	@IsString()
	@MaxLength(20)
	vat_number?: string

	@IsOptional()
	@IsString()
	@MaxLength(30)
	phone?: string

	@IsString()
	@MaxLength(255)
	street1!: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	street2?: string

	@IsString()
	@MaxLength(255)
	city!: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	region?: string

	@IsString()
	@MaxLength(20)
	postal_code!: string

	@IsString()
	@MaxLength(50)
	country!: string

	@IsOptional()
	@IsString()
	@MaxLength(20)
	geo_code?: string
}

// Update Shipping Address DTO
export class RecurlyAccountShippingAddressUpdateDto {
	@IsOptional()
	@IsString()
	@MaxLength(255)
	nickname?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	first_name?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	last_name?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	company?: string

	@IsOptional()
	@IsEmail()
	@MaxLength(255)
	email?: string

	@IsOptional()
	@IsString()
	@MaxLength(20)
	vat_number?: string

	@IsOptional()
	@IsString()
	@MaxLength(30)
	phone?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	street1?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	street2?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	city?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	region?: string

	@IsOptional()
	@IsString()
	@MaxLength(20)
	postal_code?: string

	@IsOptional()
	@IsString()
	@MaxLength(50)
	country?: string

	@IsOptional()
	@IsString()
	@MaxLength(20)
	geo_code?: string
}
