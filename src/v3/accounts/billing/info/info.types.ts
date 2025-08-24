import { RecurlyPaymentMethod } from '../../../transaction/transaction.types'
import { RecurlyAddress } from '../../../v3.types'
import { RecurlyFraudInfo, RecurlyPaymentGatewayReference } from '../../accounts.types'

export type RecurlyFundingSource = 'credit' | 'debit' | 'prepaid' | 'unknown'

export interface RecurlyBillingInfo {
	id?: string
	object?: string
	account_id?: string
	first_name?: string
	last_name?: string
	company?: string
	address?: RecurlyAddress
	vat_number?: string
	valid?: boolean
	payment_method?: RecurlyPaymentMethod
	fraud?: RecurlyFraudInfo
	primary_payment_method?: boolean
	backup_payment_method?: boolean
	payment_gateway_references?: RecurlyPaymentGatewayReference[]
	created_at?: string
	updated_at?: string
	updated_by?: RecurlyBillingInfoUpdatedBy
}
export interface RecurlyBillingInfoUpdatedBy {
	ip?: string
	country?: string
}
