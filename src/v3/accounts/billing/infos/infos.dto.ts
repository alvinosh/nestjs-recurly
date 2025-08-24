import { RecurlyAddressDto } from '../../../v3.dtos'
import {
	RecurlyAccountType,
	RecurlyBillingTransactionType,
	RecurlyCardNetworkPreference,
	RecurlyCardType,
	RecurlyExternalHppType,
	RecurlyOnlineBankingPaymentType,
	RecurlyTaxIdentifierType,
} from '../../../v3.types'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsBoolean,
	IsDateString,
	IsEnum,
	IsOptional,
	IsString,
	MaxLength,
	ValidateNested,
} from 'class-validator'

// List Billing Infos Query DTO
export class RecurlyListBillingInfosQueryDto {
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	ids?: string[]

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

// Payment Gateway Reference DTO
export class RecurlyPaymentGatewayReferenceDto {
	@IsOptional()
	@IsString()
	@MaxLength(50)
	token?: string

	@IsOptional()
	@IsEnum(['stripe_confirmation_token', 'upi_vpa'])
	reference_type?: 'stripe_confirmation_token' | 'upi_vpa'
}

// Gateway Attributes DTO
export class RecurlyGatewayAttributesDto {
	@IsOptional()
	@IsString()
	@MaxLength(264)
	account_reference?: string
}

// Create Billing Info DTO
export class RecurlyCreateBillingInfoDto {
	@IsOptional()
	@IsString()
	@MaxLength(22)
	token_id?: string

	@IsOptional()
	@IsString()
	@MaxLength(50)
	first_name?: string

	@IsOptional()
	@IsString()
	@MaxLength(50)
	last_name?: string

	@IsOptional()
	@IsString()
	@MaxLength(100)
	company?: string

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlyAddressDto)
	address?: RecurlyAddressDto

	@IsOptional()
	@IsString()
	number?: string

	@IsOptional()
	@IsString()
	@MaxLength(2)
	month?: string

	@IsOptional()
	@IsString()
	@MaxLength(4)
	year?: string

	@IsOptional()
	@IsString()
	@MaxLength(4)
	cvv?: string

	@IsOptional()
	@IsString()
	currency?: string

	@IsOptional()
	@IsString()
	vat_number?: string

	@IsOptional()
	@IsString()
	@MaxLength(20)
	ip_address?: string

	@IsOptional()
	@IsString()
	@MaxLength(50)
	gateway_token?: string

	@IsOptional()
	@IsString()
	@MaxLength(12)
	gateway_code?: string

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyPaymentGatewayReferenceDto)
	payment_gateway_references?: RecurlyPaymentGatewayReferenceDto[]

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlyGatewayAttributesDto)
	gateway_attributes?: RecurlyGatewayAttributesDto

	@IsOptional()
	@IsString()
	amazon_billing_agreement_id?: string

	@IsOptional()
	@IsString()
	paypal_billing_agreement_id?: string

	@IsOptional()
	@IsString()
	roku_billing_agreement_id?: string

	@IsOptional()
	@IsString()
	fraud_session_id?: string

	@IsOptional()
	@IsString()
	adyen_risk_profile_reference_id?: string

	@IsOptional()
	@IsEnum(['moto'])
	transaction_type?: RecurlyBillingTransactionType

	@IsOptional()
	@IsString()
	@MaxLength(22)
	three_d_secure_action_result_token_id?: string

	@IsOptional()
	@IsString()
	@MaxLength(34)
	iban?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	name_on_account?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	account_number?: string

	@IsOptional()
	@IsString()
	@MaxLength(15)
	routing_number?: string

	@IsOptional()
	@IsString()
	@MaxLength(15)
	sort_code?: string

	@IsOptional()
	@IsEnum(['bacs', 'becs'])
	type?: 'bacs' | 'becs'

	@IsOptional()
	@IsEnum(['checking', 'savings'])
	account_type?: RecurlyAccountType

	@IsOptional()
	@IsString()
	tax_identifier?: string

	@IsOptional()
	@IsEnum(['cpf', 'cnpj', 'cuit'])
	tax_identifier_type?: RecurlyTaxIdentifierType

	@IsOptional()
	@IsBoolean()
	primary_payment_method?: boolean

	@IsOptional()
	@IsBoolean()
	backup_payment_method?: boolean

	@IsOptional()
	@IsEnum(['adyen'])
	external_hpp_type?: RecurlyExternalHppType

	@IsOptional()
	@IsEnum(['ideal', 'sofort'])
	online_banking_payment_type?: RecurlyOnlineBankingPaymentType

	@IsOptional()
	@IsEnum([
		'American Express',
		'Dankort',
		'Diners Club',
		'Discover',
		'ELO',
		'Forbrugsforeningen',
		'Hipercard',
		'JCB',
		'Laser',
		'Maestro',
		'MasterCard',
		'Test Card',
		'Union Pay',
		'Unknown',
		'Visa',
		'Tarjeta Naranja',
	])
	card_type?: RecurlyCardType

	@IsOptional()
	@IsEnum(['Bancontact', 'CartesBancaires', 'Dankort', 'MasterCard', 'Visa'])
	card_network_preference?: RecurlyCardNetworkPreference

	@IsOptional()
	@IsString()
	return_url?: string
}

// Update Billing Info DTO
export class RecurlyUpdateBillingInfoDto extends RecurlyCreateBillingInfoDto {}

// Verify Billing Info DTO
export class RecurlyVerifyBillingInfoDto {
	@IsOptional()
	@IsString()
	@MaxLength(13)
	gateway_code?: string

	@IsOptional()
	@IsString()
	three_d_secure_action_result_token_id?: string
}

// Verify Billing Info CVV DTO
export class RecurlyVerifyBillingInfoCVVDto {
	@IsOptional()
	@IsString()
	verification_value?: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	gateway_code?: string

	@IsOptional()
	@IsString()
	three_d_secure_action_result_token_id?: string

	@IsOptional()
	@IsString()
	token_id?: string
}
