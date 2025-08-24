import { RECURLY_API_BASE_URL } from '../../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../../v3.helpers'
import {
	RecurlyListExternalSubscriptionsQueryDto,
	RecurlyCreateExternalSubscriptionDto,
	RecurlyUpdateExternalSubscriptionDto,
} from './externalSubscription.dtos'
import { RecurlyExternalSubscription, RecurlyExternalSubscriptionListResponse } from './externalSubscription.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ExternalSubscriptionService {
	private readonly logger = new Logger(ExternalSubscriptionService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listExternalSubscriptions(
		params?: RecurlyListExternalSubscriptionsQueryDto,
		apiKey?: string,
	): Promise<RecurlyExternalSubscriptionListResponse> {
		let url = `${RECURLY_API_BASE_URL}/external_subscriptions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List External Subscriptions')
		return (await response.json()) as RecurlyExternalSubscriptionListResponse
	}

	async getExternalSubscription(
		externalSubscriptionId: string,
		apiKey?: string,
	): Promise<RecurlyExternalSubscription> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/external_subscriptions/${externalSubscriptionId}`, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get External Subscription')
		return (await response.json()) as RecurlyExternalSubscription
	}

	async createExternalSubscription(
		data: RecurlyCreateExternalSubscriptionDto,
		apiKey?: string,
	): Promise<RecurlyExternalSubscription> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/external_subscriptions`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create External Subscription')
		return (await response.json()) as RecurlyExternalSubscription
	}

	async updateExternalSubscription(
		externalSubscriptionId: string,
		data: RecurlyUpdateExternalSubscriptionDto,
		apiKey?: string,
	): Promise<RecurlyExternalSubscription> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/external_subscriptions/${externalSubscriptionId}`, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Update External Subscription')
		return (await response.json()) as RecurlyExternalSubscription
	}
}
