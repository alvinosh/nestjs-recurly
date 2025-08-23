import { RecurlyConfigDto } from '../../config/config.dto'
import { InjectConfig } from '../../config/config.provider'
import { RecurlyInvoiceCollection } from '../invoice/invoice.types'
import { RECURLY_API_BASE_URL } from '../v3.constants'
import { checkResponseIsOk, getHeaders } from '../v3.helpers'
import { RecurlyPurchaseCreateDto } from './purchase.dto'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class PurchaseService {
	private readonly logger = new Logger(PurchaseService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	/**
	 * Create a new purchase
	 * A purchase is a checkout containing at least one or more subscriptions or one-time charges
	 */
	async createPurchase(data: RecurlyPurchaseCreateDto, apiKey?: string): Promise<RecurlyInvoiceCollection> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/purchases`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create Purchase')
		return (await response.json()) as RecurlyInvoiceCollection
	}

	/**
	 * Preview a new purchase
	 * Returns preview of the new invoices without creating them
	 */
	async previewPurchase(data: RecurlyPurchaseCreateDto, apiKey?: string): Promise<RecurlyInvoiceCollection> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/purchases/preview`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Preview Purchase')
		return (await response.json()) as RecurlyInvoiceCollection
	}

	/**
	 * Create a pending purchase
	 * Use for Adyen HPP and Online Banking transaction requests
	 * This runs the validations but not the transactions
	 */
	async createPendingPurchase(data: RecurlyPurchaseCreateDto, apiKey?: string): Promise<RecurlyInvoiceCollection> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/purchases/pending`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create Pending Purchase')
		return (await response.json()) as RecurlyInvoiceCollection
	}

	/**
	 * Authorize a purchase
	 * Creates a pending purchase that can be activated later once payment has been completed on an external source
	 */
	async authorizePurchase(data: RecurlyPurchaseCreateDto, apiKey?: string): Promise<RecurlyInvoiceCollection> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/purchases/authorize`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Authorize Purchase')
		return (await response.json()) as RecurlyInvoiceCollection
	}

	/**
	 * Capture a purchase
	 * Capture an open Authorization request
	 */
	async capturePurchase(transactionId: string, apiKey?: string): Promise<RecurlyInvoiceCollection> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/purchases/${transactionId}/capture`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify({}),
		})

		await checkResponseIsOk(response, this.logger, 'Capture Purchase')
		return (await response.json()) as RecurlyInvoiceCollection
	}

	/**
	 * Cancel a purchase
	 * Cancel an open Authorization request
	 */
	async cancelPurchase(transactionId: string, apiKey?: string): Promise<RecurlyInvoiceCollection> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/purchases/${transactionId}/cancel/`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify({}),
		})

		await checkResponseIsOk(response, this.logger, 'Cancel Purchase')
		return (await response.json()) as RecurlyInvoiceCollection
	}
}
