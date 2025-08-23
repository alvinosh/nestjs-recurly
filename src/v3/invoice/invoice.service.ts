import { RecurlyConfigDto } from '../../config/config.dto'
import { InjectConfig } from '../../config/config.provider'
import { RecurlyListCouponRedemptionsQueryDto } from '../accounts/couponRedemption/couponRedemption.dto'
import { RECURLY_API_BASE_URL } from '../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../v3.helpers'
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
	RecurlyListLineItemsQueryDto,
	RecurlyListTransactionsQueryDto,
} from './invoice.dto'
import {
	RecurlyInvoice,
	RecurlyInvoiceCollection,
	RecurlyInvoiceListResponse,
	RecurlyLineItemListResponse,
	RecurlyTransactionListResponse,
	RecurlyCreditPaymentListResponse,
	RecurlyExternalInvoice,
} from './invoice.types'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class InvoiceService {
	private readonly logger = new Logger(InvoiceService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	// List invoices
	async listInvoices(params?: RecurlyListInvoicesQueryDto, apiKey?: string): Promise<RecurlyInvoiceListResponse> {
		let url = `${RECURLY_API_BASE_URL}/invoices`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Invoices')
		return (await response.json()) as RecurlyInvoiceListResponse
	}

	// List account invoices
	async listAccountInvoices(
		accountId: string,
		params?: RecurlyListAccountInvoicesQueryDto,
		apiKey?: string,
	): Promise<RecurlyInvoiceListResponse> {
		let url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/invoices`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Account Invoices')
		return (await response.json()) as RecurlyInvoiceListResponse
	}

	// Create invoice
	async createInvoice(
		accountId: string,
		data: RecurlyCreateInvoiceDto,
		apiKey?: string,
	): Promise<RecurlyInvoiceCollection> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/accounts/${accountId}/invoices`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create Invoice')
		return (await response.json()) as RecurlyInvoiceCollection
	}

	// Preview invoice
	async previewInvoice(
		accountId: string,
		data: RecurlyCreateInvoiceDto,
		apiKey?: string,
	): Promise<RecurlyInvoiceCollection> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/accounts/${accountId}/invoices/preview`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Preview Invoice')
		return (await response.json()) as RecurlyInvoiceCollection
	}

	// Get invoice
	async getInvoice(invoiceId: string, apiKey?: string): Promise<RecurlyInvoice> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/invoices/${invoiceId}`, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get Invoice')
		return (await response.json()) as RecurlyInvoice
	}

	// Update invoice
	async updateInvoice(invoiceId: string, data: RecurlyUpdateInvoiceDto, apiKey?: string): Promise<RecurlyInvoice> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/invoices/${invoiceId}`, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Update Invoice')
		return (await response.json()) as RecurlyInvoice
	}

	// Get invoice PDF
	async getInvoicePdf(invoiceId: string, apiKey?: string): Promise<Buffer> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/invoices/${invoiceId}.pdf`, {
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
	async applyCreditBalance(invoiceId: string, apiKey?: string): Promise<RecurlyInvoice> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/invoices/${invoiceId}/apply_credit_balance`, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Apply Credit Balance')
		return (await response.json()) as RecurlyInvoice
	}

	// Collect invoice
	async collectInvoice(invoiceId: string, data?: RecurlyCollectInvoiceDto, apiKey?: string): Promise<RecurlyInvoice> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/invoices/${invoiceId}/collect`, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
			body: data ? JSON.stringify(data) : undefined,
		})

		await checkResponseIsOk(response, this.logger, 'Collect Invoice')
		return (await response.json()) as RecurlyInvoice
	}

	// Mark invoice as failed
	async markInvoiceFailed(invoiceId: string, apiKey?: string): Promise<RecurlyInvoice> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/invoices/${invoiceId}/mark_failed`, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Mark Invoice Failed')
		return (await response.json()) as RecurlyInvoice
	}

	// Mark invoice as successful
	async markInvoiceSuccessful(invoiceId: string, apiKey?: string): Promise<RecurlyInvoice> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/invoices/${invoiceId}/mark_successful`, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Mark Invoice Successful')
		return (await response.json()) as RecurlyInvoice
	}

	// Reopen invoice
	async reopenInvoice(invoiceId: string, apiKey?: string): Promise<RecurlyInvoice> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/invoices/${invoiceId}/reopen`, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Reopen Invoice')
		return (await response.json()) as RecurlyInvoice
	}

	// Void invoice
	async voidInvoice(invoiceId: string, apiKey?: string): Promise<RecurlyInvoice> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/invoices/${invoiceId}/void`, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Void Invoice')
		return (await response.json()) as RecurlyInvoice
	}

	// List invoice transactions
	async listInvoiceTransactions(
		invoiceId: string,
		params?: RecurlyListTransactionsQueryDto,
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

	// List invoice line items
	async listInvoiceLineItems(
		invoiceId: string,
		params?: RecurlyListLineItemsQueryDto,
		apiKey?: string,
	): Promise<RecurlyLineItemListResponse> {
		let url = `${RECURLY_API_BASE_URL}/invoices/${invoiceId}/line_items`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Invoice Line Items')
		return (await response.json()) as RecurlyLineItemListResponse
	}

	// List invoice coupon redemptions
	async listInvoiceCouponRedemptions(
		invoiceId: string,
		params?: RecurlyListCouponRedemptionsQueryDto,
		apiKey?: string,
	): Promise<RecurlyCreditPaymentListResponse> {
		let url = `${RECURLY_API_BASE_URL}/invoices/${invoiceId}/coupon_redemptions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Invoice Coupon Redemptions')
		return (await response.json()) as RecurlyCreditPaymentListResponse
	}

	// List related invoices
	async listRelatedInvoices(invoiceId: string, apiKey?: string): Promise<RecurlyInvoiceListResponse> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/invoices/${invoiceId}/related_invoices`, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Related Invoices')
		return (await response.json()) as RecurlyInvoiceListResponse
	}

	// Refund invoice
	async refundInvoice(invoiceId: string, data: RecurlyRefundInvoiceDto, apiKey?: string): Promise<RecurlyInvoice> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/invoices/${invoiceId}/refund`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Refund Invoice')
		return (await response.json()) as RecurlyInvoice
	}

	// List subscription invoices
	async listSubscriptionInvoices(
		subscriptionId: string,
		params?: RecurlyListSubscriptionInvoicesQueryDto,
		apiKey?: string,
	): Promise<RecurlyInvoiceListResponse> {
		let url = `${RECURLY_API_BASE_URL}/subscriptions/${subscriptionId}/invoices`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Subscription Invoices')
		return (await response.json()) as RecurlyInvoiceListResponse
	}

	// List business entity invoices
	async listBusinessEntityInvoices(
		businessEntityId: string,
		params?: RecurlyListBusinessEntityInvoicesQueryDto,
		apiKey?: string,
	): Promise<RecurlyInvoiceListResponse> {
		let url = `${RECURLY_API_BASE_URL}/business_entities/${businessEntityId}/invoices`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Business Entity Invoices')
		return (await response.json()) as RecurlyInvoiceListResponse
	}

	// Create external invoice (for external invoices)
	async createExternalInvoice(
		data: RecurlyCreateExternalInvoiceDto,
		apiKey?: string,
	): Promise<RecurlyExternalInvoice> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/invoices`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create External Invoice')
		return (await response.json()) as RecurlyExternalInvoice
	}
}
