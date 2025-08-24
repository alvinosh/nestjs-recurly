import { RECURLY_API_BASE_URL } from '../../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../../v3.helpers'
import { RecurlyListLineItemsQueryDto, RecurlyCreateLineItemDto } from './lineItem.dtos'
import { RecurlyLineItem, RecurlyLineItemListResponse } from './lineItem.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class LineItemService {
	private readonly logger = new Logger(LineItemService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	/**
	 * List all line items for the site
	 */
	async listLineItems(params?: RecurlyListLineItemsQueryDto, apiKey?: string): Promise<RecurlyLineItemListResponse> {
		let url = `${RECURLY_API_BASE_URL}/line_items`
		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}
		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})
		await checkResponseIsOk(response, this.logger, 'List Line Items')
		return (await response.json()) as RecurlyLineItemListResponse
	}

	/**
	 * List an account's line items
	 */
	async listAccountLineItems(
		accountId: string,
		params?: RecurlyListLineItemsQueryDto,
		apiKey?: string,
	): Promise<RecurlyLineItemListResponse> {
		let url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/line_items`
		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}
		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})
		await checkResponseIsOk(response, this.logger, 'List Account Line Items')
		return (await response.json()) as RecurlyLineItemListResponse
	}

	/**
	 * List an invoice's line items
	 */
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

	/**
	 * List a subscription's line items
	 */
	async listSubscriptionLineItems(
		subscriptionId: string,
		params?: RecurlyListLineItemsQueryDto,
		apiKey?: string,
	): Promise<RecurlyLineItemListResponse> {
		let url = `${RECURLY_API_BASE_URL}/subscriptions/${subscriptionId}/line_items`
		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}
		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})
		await checkResponseIsOk(response, this.logger, 'List Subscription Line Items')
		return (await response.json()) as RecurlyLineItemListResponse
	}

	/**
	 * Create a new line item for the account
	 */
	async createLineItem(accountId: string, data: RecurlyCreateLineItemDto, apiKey?: string): Promise<RecurlyLineItem> {
		const url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/line_items`
		const response = await fetch(url, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})
		await checkResponseIsOk(response, this.logger, 'Create Line Item')
		return (await response.json()) as RecurlyLineItem
	}

	/**
	 * Fetch a line item by ID
	 */
	async getLineItem(lineItemId: string, apiKey?: string): Promise<RecurlyLineItem> {
		const url = `${RECURLY_API_BASE_URL}/line_items/${lineItemId}`
		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})
		await checkResponseIsOk(response, this.logger, 'Get Line Item')
		return (await response.json()) as RecurlyLineItem
	}

	/**
	 * Delete an uninvoiced (pending) line item
	 */
	async removeLineItem(lineItemId: string, apiKey?: string): Promise<void> {
		const url = `${RECURLY_API_BASE_URL}/line_items/${lineItemId}`
		const response = await fetch(url, {
			method: 'DELETE',
			headers: getHeaders(this.config, apiKey),
		})
		if (response.status !== 204) {
			await checkResponseIsOk(response, this.logger, 'Remove Line Item')
		}
		// No content expected on success
	}
}
