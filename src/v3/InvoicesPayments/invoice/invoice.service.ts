import { RecurlyListCouponRedemptionsQueryDto } from '../../Customers/accounts/couponRedemption/couponRedemption.dto'
import { RecurlyCouponRedemptionList } from '../../Customers/accounts/couponRedemption/couponRedemption.types'
import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../v3.helpers'
import { RecurlyListLineItemsQueryDto } from '../lineItem/lineItem.dtos'
import { RecurlyLineItemListResponse } from '../lineItem/lineItem.types'
import { RecurlyTransactionListResponse } from '../transaction/transaction.types'
import {
	RecurlyListInvoicesQueryDto,
	RecurlyListAccountInvoicesQueryDto,
	RecurlyListSubscriptionInvoicesQueryDto,
	RecurlyListBusinessEntityInvoicesQueryDto,
	RecurlyCreateInvoiceDto,
	RecurlyUpdateInvoiceDto,
	RecurlyCollectInvoiceDto,
	RecurlyRefundInvoiceDto,
	RecurlyCreateExternalInvoiceDto,
	RecurlyListTransactionsQueryDto,
} from './invoice.dto'
import {
	RecurlyInvoice,
	RecurlyInvoiceCollection,
	RecurlyInvoiceListResponse,
	RecurlyExternalInvoice,
} from './invoice.types'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class InvoiceService {
	private readonly logger = new Logger(InvoiceService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	// List invoices
	async listInvoices(
		params?: RecurlyListInvoicesQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyInvoiceListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/invoices`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Invoices')
		return (await response.json()) as RecurlyInvoiceListResponse
	}

	// List account invoices
	async listAccountInvoices(
		accountId: string,
		params?: RecurlyListAccountInvoicesQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyInvoiceListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/invoices`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Account Invoices')
		return (await response.json()) as RecurlyInvoiceListResponse
	}

	// Create invoice
	async createInvoice(
		accountId: string,
		data: RecurlyCreateInvoiceDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyInvoiceCollection> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/invoices`, {
			method: 'POST',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create Invoice')
		return (await response.json()) as RecurlyInvoiceCollection
	}

	// Preview invoice
	async previewInvoice(
		accountId: string,
		data: RecurlyCreateInvoiceDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyInvoiceCollection> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/invoices/preview`,
			{
				method: 'POST',
				headers: getHeaders(this.config, config?.key),
				body: JSON.stringify(data),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Preview Invoice')
		return (await response.json()) as RecurlyInvoiceCollection
	}

	// Get invoice
	async getInvoice(invoiceId: string, config?: RecurlyAPIConnection): Promise<RecurlyInvoice> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/invoices/${invoiceId}`, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Get Invoice')
		return (await response.json()) as RecurlyInvoice
	}

	// Update invoice
	async updateInvoice(
		invoiceId: string,
		data: RecurlyUpdateInvoiceDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyInvoice> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/invoices/${invoiceId}`, {
			method: 'PUT',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Update Invoice')
		return (await response.json()) as RecurlyInvoice
	}

	// Get invoice PDF
	async getInvoicePdf(invoiceId: string, config?: RecurlyAPIConnection): Promise<Buffer> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/invoices/${invoiceId}.pdf`, {
			method: 'GET',
			headers: {
				...getHeaders(this.config, apiKey),
				Accept: 'application/pdf',
			},
		})

		await checkResponseIsOk(response, this.logger, 'Get Invoice PDF')
		const arrayBuffer = await response.arrayBuffer()
		return Buffer.from(arrayBuffer)
	}

	// Apply credit balance
	async applyCreditBalance(invoiceId: string, config?: RecurlyAPIConnection): Promise<RecurlyInvoice> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/invoices/${invoiceId}/apply_credit_balance`,
			{
				method: 'PUT',
				headers: getHeaders(this.config, config?.key),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Apply Credit Balance')
		return (await response.json()) as RecurlyInvoice
	}

	// Collect invoice
	async collectInvoice(
		invoiceId: string,
		data?: RecurlyCollectInvoiceDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyInvoice> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/invoices/${invoiceId}/collect`, {
			method: 'PUT',
			headers: getHeaders(this.config, config?.key),
			body: data ? JSON.stringify(data) : undefined,
		})

		await checkResponseIsOk(response, this.logger, 'Collect Invoice')
		return (await response.json()) as RecurlyInvoice
	}

	// Mark invoice as failed
	async markInvoiceFailed(invoiceId: string, config?: RecurlyAPIConnection): Promise<RecurlyInvoice> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/invoices/${invoiceId}/mark_failed`, {
			method: 'PUT',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Mark Invoice Failed')
		return (await response.json()) as RecurlyInvoice
	}

	// Mark invoice as successful
	async markInvoiceSuccessful(invoiceId: string, config?: RecurlyAPIConnection): Promise<RecurlyInvoice> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/invoices/${invoiceId}/mark_successful`,
			{
				method: 'PUT',
				headers: getHeaders(this.config, config?.key),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Mark Invoice Successful')
		return (await response.json()) as RecurlyInvoice
	}

	// Reopen invoice
	async reopenInvoice(invoiceId: string, config?: RecurlyAPIConnection): Promise<RecurlyInvoice> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/invoices/${invoiceId}/reopen`, {
			method: 'PUT',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Reopen Invoice')
		return (await response.json()) as RecurlyInvoice
	}

	// Void invoice
	async voidInvoice(invoiceId: string, config?: RecurlyAPIConnection): Promise<RecurlyInvoice> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/invoices/${invoiceId}/void`, {
			method: 'PUT',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Void Invoice')
		return (await response.json()) as RecurlyInvoice
	}

	// List invoice transactions
	async listInvoiceTransactions(
		invoiceId: string,
		params?: RecurlyListTransactionsQueryDto,
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

	// List invoice line items
	async listInvoiceLineItems(
		invoiceId: string,
		params?: RecurlyListLineItemsQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyLineItemListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/invoices/${invoiceId}/line_items`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Invoice Line Items')
		return (await response.json()) as RecurlyLineItemListResponse
	}

	// List invoice coupon redemptions
	async listInvoiceCouponRedemptions(
		invoiceId: string,
		params?: RecurlyListCouponRedemptionsQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyCouponRedemptionList> {
		let url = `${getBaseUrl(this.config, config?.location)}/invoices/${invoiceId}/coupon_redemptions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Invoice Coupon Redemptions')
		return (await response.json()) as RecurlyCouponRedemptionList
	}

	// List related invoices
	async listRelatedInvoices(invoiceId: string, config?: RecurlyAPIConnection): Promise<RecurlyInvoiceListResponse> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/invoices/${invoiceId}/related_invoices`,
			{
				method: 'GET',
				headers: getHeaders(this.config, config?.key),
			},
		)

		await checkResponseIsOk(response, this.logger, 'List Related Invoices')
		return (await response.json()) as RecurlyInvoiceListResponse
	}

	// Refund invoice
	async refundInvoice(
		invoiceId: string,
		data: RecurlyRefundInvoiceDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyInvoice> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/invoices/${invoiceId}/refund`, {
			method: 'POST',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Refund Invoice')
		return (await response.json()) as RecurlyInvoice
	}

	// List subscription invoices
	async listSubscriptionInvoices(
		subscriptionId: string,
		params?: RecurlyListSubscriptionInvoicesQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyInvoiceListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/subscriptions/${subscriptionId}/invoices`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Subscription Invoices')
		return (await response.json()) as RecurlyInvoiceListResponse
	}

	// List business entity invoices
	async listBusinessEntityInvoices(
		businessEntityId: string,
		params?: RecurlyListBusinessEntityInvoicesQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyInvoiceListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/business_entities/${businessEntityId}/invoices`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Business Entity Invoices')
		return (await response.json()) as RecurlyInvoiceListResponse
	}

	// Create external invoice (for external invoices)
	async createExternalInvoice(
		data: RecurlyCreateExternalInvoiceDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyExternalInvoice> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/invoices`, {
			method: 'POST',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create External Invoice')
		return (await response.json()) as RecurlyExternalInvoice
	}
}
