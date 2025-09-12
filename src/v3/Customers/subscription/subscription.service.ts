import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../v3.helpers'
import {
	RecurlyListSubscriptionsQueryDto,
	RecurlySubscriptionCancelDto,
	RecurlySubscriptionCreateDto,
	RecurlySubscriptionPauseDto,
	RecurlySubscriptionUpdateDto,
} from './subscription.dto'
import { RecurlySubscription, RecurlySubscriptionList } from './subscription.types'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class SubscriptionService {
	private readonly logger = new Logger(SubscriptionService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	/**
	 * List an account's subscriptions
	 * @param accountId - Account ID or code. For ID no prefix is used e.g. `e28zov4fw0v2`. For code use prefix `code-`, e.g. `code-bob`.
	 * @param params - Query parameters for filtering
	 * @param apiKey - Optional API key to use for this request
	 * @returns A list of the account's subscriptions
	 */
	async listAccountSubscriptions(
		accountId: string,
		params?: RecurlyListSubscriptionsQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlySubscriptionList> {
		let url = `${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/subscriptions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Account Subscriptions')
		return (await response.json()) as RecurlySubscriptionList
	}

	/**
	 * List a site's subscriptions
	 * @param params - Query parameters for filtering
	 * @param apiKey - Optional API key to use for this request
	 * @returns A list of the site's subscriptions
	 */
	async listSubscriptions(
		params?: RecurlyListSubscriptionsQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlySubscriptionList> {
		let url = `${getBaseUrl(this.config, config?.location)}/subscriptions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Subscriptions')
		return (await response.json()) as RecurlySubscriptionList
	}

	/**
	 * Create a new subscription
	 * @param data - Subscription creation data
	 * @param apiKey - Optional API key to use for this request
	 * @returns The created subscription
	 */
	async createSubscription(
		data: RecurlySubscriptionCreateDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlySubscription> {
		const url = `${getBaseUrl(this.config, config?.location)}/subscriptions`

		const response = await fetch(url, {
			method: 'POST',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create Subscription')
		return (await response.json()) as RecurlySubscription
	}

	/**
	 * Fetch a subscription
	 * @param subscriptionId - Subscription ID
	 * @param apiKey - Optional API key to use for this request
	 * @returns The subscription
	 */
	async getSubscription(subscriptionId: string, config?: RecurlyAPIConnection): Promise<RecurlySubscription> {
		const url = `${getBaseUrl(this.config, config?.location)}/subscriptions/${subscriptionId}`

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Get Subscription')
		return (await response.json()) as RecurlySubscription
	}

	/**
	 * Update a subscription
	 * @param subscriptionId - Subscription ID
	 * @param data - Subscription update data
	 * @param apiKey - Optional API key to use for this request
	 * @returns The updated subscription
	 */
	async updateSubscription(
		subscriptionId: string,
		data: RecurlySubscriptionUpdateDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlySubscription> {
		const url = `${getBaseUrl(this.config, config?.location)}/subscriptions/${subscriptionId}`

		const response = await fetch(url, {
			method: 'PUT',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Update Subscription')
		return (await response.json()) as RecurlySubscription
	}

	/**
	 * Cancel a subscription
	 * @param subscriptionId - Subscription ID
	 * @param data - Cancel options
	 * @param apiKey - Optional API key to use for this request
	 * @returns The canceled subscription
	 */
	async cancelSubscription(
		subscriptionId: string,
		data?: RecurlySubscriptionCancelDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlySubscription> {
		let url = `${getBaseUrl(this.config, config?.location)}/subscriptions/${subscriptionId}/cancel`

		if (data && Object.keys(data).length > 0) {
			url += '?' + buildQueryString(data)
		}

		const response = await fetch(url, {
			method: 'PUT',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Cancel Subscription')
		return (await response.json()) as RecurlySubscription
	}

	/**
	 * Terminate a subscription
	 * @param subscriptionId - Subscription ID
	 * @param refund - The type of refund to perform: 'full', 'partial', or 'none'
	 * @param charge - Whether to bill unbilled usage (only applicable for usage-based add-ons)
	 * @param apiKey - Optional API key to use for this request
	 * @returns The terminated subscription
	 */
	async terminateSubscription(
		subscriptionId: string,
		refund: 'full' | 'partial' | 'none' = 'none',
		charge: boolean = true,
		config?: RecurlyAPIConnection,
	): Promise<RecurlySubscription> {
		const params = new URLSearchParams({
			refund,
			charge: charge.toString(),
		})

		const url = `${getBaseUrl(this.config, config?.location)}/subscriptions/${subscriptionId}?${params.toString()}`

		const response = await fetch(url, {
			method: 'DELETE',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Terminate Subscription')
		return (await response.json()) as RecurlySubscription
	}

	/**
	 * Reactivate a canceled subscription
	 * @param subscriptionId - Subscription ID
	 * @param apiKey - Optional API key to use for this request
	 * @returns The reactivated subscription
	 */
	async reactivateSubscription(subscriptionId: string, config?: RecurlyAPIConnection): Promise<RecurlySubscription> {
		const url = `${getBaseUrl(this.config, config?.location)}/subscriptions/${subscriptionId}/reactivate`

		const response = await fetch(url, {
			method: 'PUT',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Reactivate Subscription')
		return (await response.json()) as RecurlySubscription
	}

	/**
	 * Pause a subscription
	 * @param subscriptionId - Subscription ID
	 * @param data - Pause options
	 * @param apiKey - Optional API key to use for this request
	 * @returns The paused subscription
	 */
	async pauseSubscription(
		subscriptionId: string,
		data: RecurlySubscriptionPauseDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlySubscription> {
		const url = `${getBaseUrl(this.config, config?.location)}/subscriptions/${subscriptionId}/pause`

		const response = await fetch(url, {
			method: 'PUT',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Pause Subscription')
		return (await response.json()) as RecurlySubscription
	}

	/**
	 * Resume a paused subscription
	 * @param subscriptionId - Subscription ID
	 * @param apiKey - Optional API key to use for this request
	 * @returns The resumed subscription
	 */
	async resumeSubscription(subscriptionId: string, config?: RecurlyAPIConnection): Promise<RecurlySubscription> {
		const url = `${getBaseUrl(this.config, config?.location)}/subscriptions/${subscriptionId}/resume`

		const response = await fetch(url, {
			method: 'PUT',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Resume Subscription')
		return (await response.json()) as RecurlySubscription
	}

	/**
	 * Convert a trial subscription to active
	 * @param subscriptionId - Subscription ID
	 * @param apiKey - Optional API key to use for this request
	 * @returns The converted subscription
	 */
	async convertTrialSubscription(
		subscriptionId: string,
		config?: RecurlyAPIConnection,
	): Promise<RecurlySubscription> {
		const url = `${getBaseUrl(this.config, config?.location)}/subscriptions/${subscriptionId}/convert_trial`

		const response = await fetch(url, {
			method: 'PUT',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Convert Trial Subscription')
		return (await response.json()) as RecurlySubscription
	}

	/**
	 * Preview subscription renewal
	 * @param subscriptionId - Subscription ID
	 * @param apiKey - Optional API key to use for this request
	 * @returns The subscription renewal preview
	 */
	async previewSubscriptionRenewal(
		subscriptionId: string,
		config?: RecurlyAPIConnection,
	): Promise<RecurlySubscription> {
		const url = `${getBaseUrl(this.config, config?.location)}/subscriptions/${subscriptionId}/preview_renewal`

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Preview Subscription Renewal')
		return (await response.json()) as RecurlySubscription
	}
}
