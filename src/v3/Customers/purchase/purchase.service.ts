import { RecurlyInvoiceCollection } from '../../InvoicesPayments/invoice/invoice.types'
import { checkResponseIsOk, getBaseUrl, getHeaders } from '../../v3.helpers'
import { RecurlyPurchaseCreateDto } from './purchase.dto'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class PurchaseService {
	private readonly logger = new Logger(PurchaseService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	/**
	 * Create a new purchase
	 * A purchase is a checkout containing at least one or more subscriptions or one-time charges
	 */
	async createPurchase(
		data: RecurlyPurchaseCreateDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyInvoiceCollection> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/purchases`, {
			method: 'POST',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create Purchase')
		return (await response.json()) as RecurlyInvoiceCollection
	}

	/**
	 * Preview a new purchase
	 * Returns preview of the new invoices without creating them
	 */
	async previewPurchase(
		data: RecurlyPurchaseCreateDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyInvoiceCollection> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/purchases/preview`, {
			method: 'POST',
			headers: getHeaders(this.config, config?.key),
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
	async createPendingPurchase(
		data: RecurlyPurchaseCreateDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyInvoiceCollection> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/purchases/pending`, {
			method: 'POST',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create Pending Purchase')
		return (await response.json()) as RecurlyInvoiceCollection
	}

	/**
	 * Authorize a purchase
	 * Creates a pending purchase that can be activated later once payment has been completed on an external source
	 */
	async authorizePurchase(
		data: RecurlyPurchaseCreateDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyInvoiceCollection> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/purchases/authorize`, {
			method: 'POST',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Authorize Purchase')
		return (await response.json()) as RecurlyInvoiceCollection
	}

	/**
	 * Capture a purchase
	 * Capture an open Authorization request
	 */
	async capturePurchase(transactionId: string, config?: RecurlyAPIConnection): Promise<RecurlyInvoiceCollection> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/purchases/${transactionId}/capture`,
			{
				method: 'POST',
				headers: getHeaders(this.config, config?.key),
				body: JSON.stringify({}),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Capture Purchase')
		return (await response.json()) as RecurlyInvoiceCollection
	}

	/**
	 * Cancel a purchase
	 * Cancel an open Authorization request
	 */
	async cancelPurchase(transactionId: string, config?: RecurlyAPIConnection): Promise<RecurlyInvoiceCollection> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/purchases/${transactionId}/cancel/`,
			{
				method: 'POST',
				headers: getHeaders(this.config, config?.key),
				body: JSON.stringify({}),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Cancel Purchase')
		return (await response.json()) as RecurlyInvoiceCollection
	}
}
