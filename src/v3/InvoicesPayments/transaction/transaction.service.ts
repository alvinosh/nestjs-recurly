import { RecurlyConfigDto } from '../../../config/config.dto'
import { InjectConfig } from '../../../config/config.provider'
import { RECURLY_API_BASE_URL } from '../../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../../v3.helpers'
import {
	RecurlyListTransactionsQueryDto,
	RecurlyListAccountTransactionsQueryDto,
	RecurlyListInvoiceTransactionsQueryDto,
} from './transaction.dto'
import { RecurlyTransaction, RecurlyTransactionListResponse } from './transaction.types'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class TransactionService {
	private readonly logger = new Logger(TransactionService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	/**
	 * List all transactions for a site
	 */
	async listTransactions(
		params?: RecurlyListTransactionsQueryDto,
		apiKey?: string,
	): Promise<RecurlyTransactionListResponse> {
		let url = `${RECURLY_API_BASE_URL}/transactions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Transactions')
		return (await response.json()) as RecurlyTransactionListResponse
	}

	/**
	 * Get a specific transaction by ID
	 */
	async getTransaction(transactionId: string, apiKey?: string): Promise<RecurlyTransaction> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/transactions/${transactionId}`, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get Transaction')
		return (await response.json()) as RecurlyTransaction
	}

	/**
	 * List transactions for a specific account
	 */
	async listAccountTransactions(
		accountId: string,
		params?: RecurlyListAccountTransactionsQueryDto,
		apiKey?: string,
	): Promise<RecurlyTransactionListResponse> {
		let url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/transactions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Account Transactions')
		return (await response.json()) as RecurlyTransactionListResponse
	}

	/**
	 * List transactions for a specific invoice
	 */
	async listInvoiceTransactions(
		invoiceId: string,
		params?: RecurlyListInvoiceTransactionsQueryDto,
		apiKey?: string,
	): Promise<RecurlyTransactionListResponse> {
		let url = `${RECURLY_API_BASE_URL}/invoices/${invoiceId}/transactions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Invoice Transactions')
		return (await response.json()) as RecurlyTransactionListResponse
	}
}
