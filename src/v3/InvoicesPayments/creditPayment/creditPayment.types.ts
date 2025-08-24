import { RecurlyAccountMini } from '../../Customers/accounts/accounts.types'
import { RecurlyInvoiceMini } from '../invoice/invoice.types'
import { RecurlyTransaction } from '../transaction/transaction.types'

// Enums
export type RecurlyCreditPaymentAction = 'payment' | 'reduction' | 'refund' | 'write_off'

// Credit Payment interface
export interface RecurlyCreditPayment {
	id?: string
	object?: string
	uuid?: string
	action?: 'payment' | 'reduction' | 'refund' | 'write_off'
	account?: RecurlyAccountMini
	applied_to_invoice?: RecurlyInvoiceMini
	original_invoice?: RecurlyInvoiceMini
	currency?: string
	amount?: number
	original_credit_payment_id?: string
	refund_transaction?: RecurlyTransaction
	created_at?: string
	updated_at?: string
	voided_at?: string
}

// Credit Payment List Response interface
export interface RecurlyCreditPaymentListResponse {
	object: string
	has_more: boolean
	next?: string
	data: RecurlyCreditPayment[]
}
