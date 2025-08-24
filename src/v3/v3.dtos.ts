import {
	IsOptional,
	IsString,
    IsNumber,
} from 'class-validator'

// Address DTO
export class RecurlyAddressDto {
    @IsOptional()
    @IsString()
    phone?: string

    @IsOptional()
    @IsString()
    street1?: string

    @IsOptional()
    @IsString()
    street2?: string

    @IsOptional()
    @IsString()
    city?: string

    @IsOptional()
    @IsString()
    region?: string

    @IsOptional()
    @IsString()
    postal_code?: string

    @IsOptional()
    @IsString()
    country?: string

    @IsOptional()
    @IsString()
    geo_code?: string
}

// Cost DTO
export class RecurlyCostDto {
	@IsOptional()
	@IsString()
	currency?: string

	@IsOptional()
	@IsNumber()
	amount?: number
}