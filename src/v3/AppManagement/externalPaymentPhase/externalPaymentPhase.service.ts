import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../v3.helpers'
import { RecurlyListExternalPaymentPhasesQueryDto } from './externalPaymentPhase.dtos'
import { RecurlyExternalPaymentPhase, RecurlyExternalPaymentPhaseListResponse } from './externalPaymentPhase.types'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ExternalPaymentPhaseService {
	private readonly logger = new Logger(ExternalPaymentPhaseService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listExternalPaymentPhases(
		externalSubscriptionId: string,
		params?: RecurlyListExternalPaymentPhasesQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyExternalPaymentPhaseListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/external_subscriptions/${externalSubscriptionId}/external_payment_phases`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List External Payment Phases')
		return (await response.json()) as RecurlyExternalPaymentPhaseListResponse
	}

	async getExternalPaymentPhase(
		externalSubscriptionId: string,
		externalPaymentPhaseId: string,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyExternalPaymentPhase> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/external_subscriptions/${externalSubscriptionId}/external_payment_phases/${externalPaymentPhaseId}`,
			{
				method: 'GET',
				headers: getHeaders(this.config, config?.key),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Get External Payment Phase')
		return (await response.json()) as RecurlyExternalPaymentPhase
	}
}
