import { Type } from 'class-transformer'
import {
	IsArray,
	IsBoolean,
	IsEnum,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
	MaxLength,
	Min,
	ValidateNested,
} from 'class-validator'

// Account Purchase DTO for creating purchases
export class RecurlyAccountPurchaseDto {
	@IsOptional()
	@IsString()
	id?: string

	@IsOptional()
	@IsString()
	code?: string

	@IsOptional()
	@IsString()
	email?: string

	@IsOptional()
	@IsString()
	first_name?: string

	@IsOptional()
	@IsString()
	last_name?: string

	@IsOptional()
	@IsString()
	username?: string

	@IsOptional()
	@IsString()
	company?: string

	@IsOptional()
	@IsString()
	vat_number?: string

	@IsOptional()
	@IsString()
	tax_exempt?: boolean

	@IsOptional()
	@IsString()
	exemption_certificate?: string

	@IsOptional()
	@IsString()
	parent_account_code?: string

	@IsOptional()
	@IsString()
	parent_account_id?: string

	@IsOptional()
	@IsEnum(['self', 'parent'])
	bill_to?: 'self' | 'parent'

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlyBillingInfoDto)
	billing_info?: RecurlyBillingInfoDto

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyCustomFieldDto)
	custom_fields?: RecurlyCustomFieldDto[]

	@IsOptional()
	@IsString()
	transaction_type?: 'moto'

	@IsOptional()
	@IsObject()
	acquisition?: RecurlyAccountAcquisitionDto
}

// Billing Info DTO
export class RecurlyBillingInfoDto {
	@IsOptional()
	@IsString()
	token_id?: string

	@IsOptional()
	@IsString()
	first_name?: string

	@IsOptional()
	@IsString()
	last_name?: string

	@IsOptional()
	@IsString()
	company?: string

	@IsOptional()
	@IsString()
	address?: RecurlyAddressDto

	@IsOptional()
	@IsString()
	number?: string

	@IsOptional()
	@IsString()
	month?: string

	@IsOptional()
	@IsString()
	year?: string

	@IsOptional()
	@IsString()
	cvv?: string

	@IsOptional()
	@IsString()
	vat_number?: string

	@IsOptional()
	@IsString()
	ip_address?: string

	@IsOptional()
	@IsString()
	gateway_token?: string

	@IsOptional()
	@IsString()
	gateway_code?: string

	@IsOptional()
	@IsString()
	amazon_billing_agreement_id?: string

	@IsOptional()
	@IsString()
	paypal_billing_agreement_id?: string

	@IsOptional()
	@IsEnum([
		'credit_card',
		'paypal',
		'amazon',
		'bank_account',
		'roku',
		'sepadirectdebit',
		'bacs',
		'becs',
		'apple_pay',
		'venmo',
	])
	payment_type?: string

	@IsOptional()
	@IsString()
	account_number?: string

	@IsOptional()
	@IsString()
	routing_number?: string

	@IsOptional()
	@IsString()
	sort_code?: string

	@IsOptional()
	@IsEnum(['checking', 'savings'])
	account_type?: 'checking' | 'savings'

	@IsOptional()
	@IsBoolean()
	tax_identifier_applies_to_all_bill_tos?: boolean

	@IsOptional()
	@IsString()
	iban?: string

	@IsOptional()
	@IsString()
	type?: string

	@IsOptional()
	@IsString()
	name_on_account?: string

	@IsOptional()
	@IsObject()
	three_d_secure_action_result_token_id?: string

	@IsOptional()
	@IsString()
	transaction_type?: 'moto'

	@IsOptional()
	@IsString()
	fraud_session_id?: string

	@IsOptional()
	@IsBoolean()
	backup_payment_method?: boolean

	@IsOptional()
	@IsString()
	external_hpp_type?: string

	@IsOptional()
	@IsString()
	online_banking_payment_type?: string

	@IsOptional()
	@IsString()
	card_type?: string
}

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

// Custom Field DTO
export class RecurlyCustomFieldDto {
	@IsString()
	name!: string

	@IsString()
	value!: string
}

// Account Acquisition DTO
export class RecurlyAccountAcquisitionDto {
	@IsOptional()
	@IsObject()
	cost?: RecurlyCostDto

	@IsOptional()
	@IsString()
	channel?: string

	@IsOptional()
	@IsString()
	subchannel?: string

	@IsOptional()
	@IsString()
	campaign?: string
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

// Subscription Purchase DTO
export class RecurlySubscriptionPurchaseDto {
	@IsString()
	plan_code!: string

	@IsOptional()
	@IsString()
	plan_id?: string

	@IsOptional()
	@IsNumber()
	@Min(0)
	quantity?: number

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlySubscriptionAddOnDto)
	add_ons?: RecurlySubscriptionAddOnDto[]

	@IsOptional()
	@IsObject()
	unit_amount?: number

	@IsOptional()
	@IsObject()
	tax_inclusive?: boolean

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlySubscriptionShippingDto)
	shipping?: RecurlySubscriptionShippingDto

	@IsOptional()
	@IsNumber()
	@Min(0)
	trial_length?: number

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	coupon_codes?: string[]

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyCustomFieldDto)
	custom_fields?: RecurlyCustomFieldDto[]

	@IsOptional()
	@IsBoolean()
	auto_renew?: boolean

	@IsOptional()
	@IsString()
	revenue_schedule_type?: string

	@IsOptional()
	@IsString()
	gateway_code?: string

	@IsOptional()
	@IsString()
	custom_po_number?: string

	@IsOptional()
	@IsNumber()
	@Min(0)
	net_terms?: number

	@IsOptional()
	@IsEnum(['net', 'eom'])
	net_terms_type?: 'net' | 'eom'

	@IsOptional()
	@IsObject()
	transaction_type?: string

	@IsOptional()
	@IsBoolean()
	tax_exempt?: boolean

	@IsOptional()
	@IsNumber()
	@Min(0)
	trial_ends_at?: string

	@IsOptional()
	@IsString()
	starts_at?: string

	@IsOptional()
	@IsString()
	next_bill_date?: string

	@IsOptional()
	@IsNumber()
	@Min(0)
	total_billing_cycles?: number

	@IsOptional()
	@IsEnum(['moto', 'at_renewal', 'first_use'])
	renewal_billing_cycles?: number

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlySubscriptionRampIntervalDto)
	ramp_intervals?: RecurlySubscriptionRampIntervalDto[]

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	item_code?: string
}

// Subscription Add-On DTO
export class RecurlySubscriptionAddOnDto {
	@IsString()
	code!: string

	@IsOptional()
	@IsString()
	add_on_source?: string

	@IsOptional()
	@IsNumber()
	@Min(0)
	quantity?: number

	@IsOptional()
	@IsNumber()
	unit_amount?: number

	@IsOptional()
	@IsObject()
	unit_amount_decimal?: string

	@IsOptional()
	@IsString()
	percentage_tiers?: RecurlyPercentageTierDto[]

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	tiers?: RecurlyTierDto[]

	@IsOptional()
	@IsString()
	usage_percentage?: number

	@IsOptional()
	@IsString()
	revenue_schedule_type?: string
}

// Percentage Tier DTO
export class RecurlyPercentageTierDto {
	@IsOptional()
	@IsNumber()
	ending_amount?: number

	@IsOptional()
	@IsString()
	usage_percentage?: string
}

// Tier DTO
export class RecurlyTierDto {
	@IsOptional()
	@IsNumber()
	ending_quantity?: number

	@IsOptional()
	@IsNumber()
	unit_amount?: number

	@IsOptional()
	@IsString()
	unit_amount_decimal?: string
}

// Subscription Shipping DTO
export class RecurlySubscriptionShippingDto {
	@IsOptional()
	@IsObject()
	address?: RecurlyShippingAddressDto

	@IsOptional()
	@IsString()
	address_id?: string

	@IsOptional()
	@IsString()
	method_code?: string

	@IsOptional()
	@IsString()
	method_id?: string

	@IsOptional()
	@IsNumber()
	amount?: number
}

// Shipping Address DTO
export class RecurlyShippingAddressDto {
	@IsOptional()
	@IsString()
	nickname?: string

	@IsOptional()
	@IsString()
	first_name?: string

	@IsOptional()
	@IsString()
	last_name?: string

	@IsOptional()
	@IsString()
	phone?: string

	@IsOptional()
	@IsString()
	email?: string

	@IsOptional()
	@IsString()
	company?: string

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
	vat_number?: string

	@IsOptional()
	@IsString()
	geo_code?: string
}

// Subscription Ramp Interval DTO
export class RecurlySubscriptionRampIntervalDto {
	@IsOptional()
	@IsNumber()
	starting_on?: string

	@IsOptional()
	@IsNumber()
	unit_amount?: number

	@IsOptional()
	@IsNumber()
	starting_billing_cycle?: number

	@IsOptional()
	@IsNumber()
	remaining_billing_cycles?: number
}

// Line Item Create DTO
export class RecurlyLineItemCreateDto {
	@IsOptional()
	@IsString()
	currency?: string

	@IsOptional()
	@IsNumber()
	unit_amount?: number

	@IsOptional()
	@IsString()
	unit_amount_decimal?: string

	@IsOptional()
	@IsNumber()
	@Min(0)
	quantity?: number

	@IsOptional()
	@IsString()
	quantity_decimal?: string

	@IsOptional()
	@IsString()
	description?: string

	@IsOptional()
	@IsString()
	item_code?: string

	@IsOptional()
	@IsString()
	item_id?: string

	@IsOptional()
	@IsString()
	revenue_schedule_type?: string

	@IsOptional()
	@IsEnum(['charge', 'credit'])
	type?: 'charge' | 'credit'

	@IsOptional()
	@IsString()
	credit_reason_code?: string

	@IsOptional()
	@IsString()
	accounting_code?: string

	@IsOptional()
	@IsBoolean()
	tax_exempt?: boolean

	@IsOptional()
	@IsString()
	tax_code?: string

	@IsOptional()
	@IsString()
	product_code?: string

	@IsOptional()
	@IsNumber()
	avalara_transaction_type?: number

	@IsOptional()
	@IsNumber()
	avalara_service_type?: number

	@IsOptional()
	@IsString()
	liability_gl_account_id?: string

	@IsOptional()
	@IsString()
	revenue_gl_account_id?: string

	@IsOptional()
	@IsString()
	performance_obligation_id?: string

	@IsOptional()
	@IsString()
	origin?: string

	@IsOptional()
	@IsString()
	start_date?: string

	@IsOptional()
	@IsString()
	end_date?: string

	@IsOptional()
	@IsString()
	destination_tax_address_source?: 'shipping' | 'billing'
}

// Shipping Purchase DTO
export class RecurlyShippingPurchaseDto {
	@IsOptional()
	@IsString()
	@MaxLength(13)
	address_id?: string

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlyShippingAddressDto)
	address?: RecurlyShippingAddressDto

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyShippingFeeCreateDto)
	fees?: RecurlyShippingFeeCreateDto[]
}

// Shipping Fee Create DTO
export class RecurlyShippingFeeCreateDto {
	@IsOptional()
	@IsString()
	method_code?: string

	@IsOptional()
	@IsString()
	method_id?: string

	@IsOptional()
	@IsNumber()
	amount?: number

	@IsOptional()
	@IsString()
	item_code?: string

	@IsOptional()
	@IsString()
	item_id?: string
}

// Transaction DTO for purchase
export class RecurlyTransactionDto {
	@IsOptional()
	@IsEnum(['cardholder_initiated', 'merchant_initiated', 'scheduled'])
	initiator?: 'cardholder_initiated' | 'merchant_initiated' | 'scheduled'

	@IsOptional()
	@IsEnum([
		'one_time_transaction',
		'recurring_transaction',
		'unscheduled_card_on_file',
		'usage_based_billing',
		'account_funding',
		'top_up_transaction',
		'recurring_prepaid',
		'installment',
		'deferred_transaction',
		'reauthorization',
		'resubmission',
		'delayed_charge',
		'no_show',
		'keyed',
	])
	merchant_reason_code?: string
}

// Main Purchase Create DTO
export class RecurlyPurchaseCreateDto {
	@IsString()
	@MaxLength(3)
	currency!: string

	@ValidateNested()
	@Type(() => RecurlyAccountPurchaseDto)
	account!: RecurlyAccountPurchaseDto

	@IsOptional()
	@IsString()
	billing_info_id?: string

	@IsOptional()
	@IsString()
	business_entity_id?: string

	@IsOptional()
	@IsString()
	business_entity_code?: string

	@IsOptional()
	@IsEnum(['automatic', 'manual'])
	collection_method?: 'automatic' | 'manual'

	@IsOptional()
	@IsString()
	@MaxLength(50)
	po_number?: string

	@IsOptional()
	@IsNumber()
	@Min(0)
	net_terms?: number

	@IsOptional()
	@IsEnum(['net', 'eom'])
	net_terms_type?: 'net' | 'eom'

	@IsOptional()
	@IsString()
	terms_and_conditions?: string

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlyTransactionDto)
	transaction?: RecurlyTransactionDto

	@IsOptional()
	@IsString()
	customer_notes?: string

	@IsOptional()
	@IsString()
	vat_reverse_charge_notes?: string

	@IsOptional()
	@IsString()
	credit_customer_notes?: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	gateway_code?: string

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlyShippingPurchaseDto)
	shipping?: RecurlyShippingPurchaseDto

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyLineItemCreateDto)
	line_items?: RecurlyLineItemCreateDto[]

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlySubscriptionPurchaseDto)
	subscriptions?: RecurlySubscriptionPurchaseDto[]

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	coupon_codes?: string[]

	@IsOptional()
	@IsString()
	gift_card_redemption_code?: string

	@IsOptional()
	@IsEnum(['moto'])
	transaction_type?: 'moto'
}
