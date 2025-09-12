import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../v3.helpers'
import {
	RecurlyListExternalSubscriptionsQueryDto,
	RecurlyCreateExternalSubscriptionDto,
	RecurlyUpdateExternalSubscriptionDto,
} from './externalSubscription.dtos'
import { RecurlyExternalSubscription, RecurlyExternalSubscriptionListResponse } from './externalSubscription.types'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ExternalSubscriptionService {
	private readonly logger = new Logger(ExternalSubscriptionService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listExternalSubscriptions(
		params?: RecurlyListExternalSubscriptionsQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyExternalSubscriptionListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/external_subscriptions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List External Subscriptions')
		return (await response.json()) as RecurlyExternalSubscriptionListResponse
	}

	async getExternalSubscription(
		externalSubscriptionId: string,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyExternalSubscription> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/external_subscriptions/${externalSubscriptionId}`,
			{
				method: 'GET',
				headers: getHeaders(this.config, config?.key),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Get External Subscription')
		return (await response.json()) as RecurlyExternalSubscription
	}

	async createExternalSubscription(
		data: RecurlyCreateExternalSubscriptionDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyExternalSubscription> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/external_subscriptions`, {
			method: 'POST',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create External Subscription')
		return (await response.json()) as RecurlyExternalSubscription
	}

	async updateExternalSubscription(
		externalSubscriptionId: string,
		data: RecurlyUpdateExternalSubscriptionDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyExternalSubscription> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/external_subscriptions/${externalSubscriptionId}`,
			{
				method: 'PUT',
				headers: getHeaders(this.config, config?.key),
				body: JSON.stringify(data),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Update External Subscription')
		return (await response.json()) as RecurlyExternalSubscription
	}
}
