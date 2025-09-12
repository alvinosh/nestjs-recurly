import { checkResponseIsOk, getBaseUrl, getHeaders } from '../../../v3.helpers'
import { RecurlySubscriptionChange } from '../subscription.types'
import { RecurlySubscriptionChangeCreate } from './change.dtos'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ChangeService {
	private readonly logger = new Logger(ChangeService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	/**
	 * Fetch a subscription's pending change
	 * @param subscriptionId - Subscription ID or UUID.
	 * @param apiKey - Optional API key to use for this request.
	 * @returns A subscription's pending change.
	 */
	async getSubscriptionChange(
		subscriptionId: string,
		config?: RecurlyAPIConnection,
	): Promise<RecurlySubscriptionChange> {
		const url = `${getBaseUrl(this.config, config?.location)}/subscriptions/${subscriptionId}/change`

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Get Subscription Change')
		return (await response.json()) as RecurlySubscriptionChange
	}

	/**
	 * Create a new subscription change
	 * @param subscriptionId - Subscription ID or UUID.
	 * @param body - The request body.
	 * @param apiKey - Optional API key to use for this request.
	 * @returns A subscription change.
	 */
	async createSubscriptionChange(
		subscriptionId: string,
		body: RecurlySubscriptionChangeCreate,
		config?: RecurlyAPIConnection,
	): Promise<RecurlySubscriptionChange | void> {
		const url = `${getBaseUrl(this.config, config?.location)}/subscriptions/${subscriptionId}/change`

		const response = await fetch(url, {
			method: 'POST',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(body),
		})

		await checkResponseIsOk(response, this.logger, 'Create Subscription Change')

		if (response.status === 204) {
			return
		}

		return (await response.json()) as RecurlySubscriptionChange
	}

	/**
	 * Delete the pending subscription change
	 * @param subscriptionId - Subscription ID or UUID.
	 * @param apiKey - Optional API key to use for this request.
	 */
	async removeSubscriptionChange(subscriptionId: string, config?: RecurlyAPIConnection): Promise<void> {
		const url = `${getBaseUrl(this.config, config?.location)}/subscriptions/${subscriptionId}/change`

		const response = await fetch(url, {
			method: 'DELETE',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Remove Subscription Change')
	}

	/**
	 * Preview a new subscription change
	 * @param subscriptionId - Subscription ID or UUID.
	 * @param body - The request body.
	 * @param apiKey - Optional API key to use for this request.
	 * @returns A subscription change.
	 */
	async previewSubscriptionChange(
		subscriptionId: string,
		body: RecurlySubscriptionChangeCreate,
		config?: RecurlyAPIConnection,
	): Promise<RecurlySubscriptionChange> {
		const url = `${getBaseUrl(this.config, config?.location)}/subscriptions/${subscriptionId}/change/preview`

		const response = await fetch(url, {
			method: 'POST',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(body),
		})

		await checkResponseIsOk(response, this.logger, 'Preview Subscription Change')
		return (await response.json()) as RecurlySubscriptionChange
	}
}
