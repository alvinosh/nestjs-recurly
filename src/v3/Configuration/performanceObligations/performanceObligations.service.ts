import { RECURLY_API_BASE_URL } from '../../v3.constants'
import { checkResponseIsOk, getHeaders } from '../../v3.helpers'
import { RecurlyPerformanceObligation, RecurlyPerformanceObligationListResponse } from './performanceObligations.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class PerformanceObligationsService {
	private readonly logger = new Logger(PerformanceObligationsService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listPerformanceObligations(apiKey?: string): Promise<RecurlyPerformanceObligationListResponse> {
		const url = `${RECURLY_API_BASE_URL}/performance_obligations`

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Performance Obligations')
		return (await response.json()) as RecurlyPerformanceObligationListResponse
	}

	async getPerformanceObligation(
		performanceObligationId: string,
		apiKey?: string,
	): Promise<RecurlyPerformanceObligation> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/performance_obligations/${performanceObligationId}`, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get Performance Obligation')
		return (await response.json()) as RecurlyPerformanceObligation
	}
}
