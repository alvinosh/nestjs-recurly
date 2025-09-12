import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../v3.helpers'
import {
	RecurlyListTransactionsQueryDto,
	RecurlyListAccountTransactionsQueryDto,
	RecurlyListInvoiceTransactionsQueryDto,
} from './transaction.dto'
import { RecurlyTransaction, RecurlyTransactionListResponse } from './transaction.types'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
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
		config?: RecurlyAPIConnection,
	): Promise<RecurlyTransactionListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/transactions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Transactions')
		return (await response.json()) as RecurlyTransactionListResponse
	}

	/**
	 * Get a specific transaction by ID
	 */
	async getTransaction(transactionId: string, config?: RecurlyAPIConnection): Promise<RecurlyTransaction> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/transactions/${transactionId}`, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
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
		config?: RecurlyAPIConnection,
	): Promise<RecurlyTransactionListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/transactions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
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
		config?: RecurlyAPIConnection,
	): Promise<RecurlyTransactionListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/invoices/${invoiceId}/transactions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Invoice Transactions')
		return (await response.json()) as RecurlyTransactionListResponse
	}
}
