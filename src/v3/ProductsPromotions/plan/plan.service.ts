import { RECURLY_API_BASE_URL } from '../../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../../v3.helpers'
import { RecurlyListPlansQueryDto, RecurlyCreatePlanDto, RecurlyUpdatePlanDto } from './plan.dto'
import { RecurlyPlan, RecurlyPlanListResponse } from './plan.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class PlanService {
	private readonly logger = new Logger(PlanService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listPlans(params?: RecurlyListPlansQueryDto, apiKey?: string): Promise<RecurlyPlanListResponse> {
		let url = `${RECURLY_API_BASE_URL}/plans`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Plans')
		return (await response.json()) as RecurlyPlanListResponse
	}

	async createPlan(data: RecurlyCreatePlanDto, apiKey?: string): Promise<RecurlyPlan> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/plans`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create Plan')
		return (await response.json()) as RecurlyPlan
	}

	async getPlan(planId: string, apiKey?: string): Promise<RecurlyPlan> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/plans/${planId}`, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get Plan')
		return (await response.json()) as RecurlyPlan
	}

	async updatePlan(planId: string, data: RecurlyUpdatePlanDto, apiKey?: string): Promise<RecurlyPlan> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/plans/${planId}`, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Update Plan')
		return (await response.json()) as RecurlyPlan
	}

	async removePlan(planId: string, apiKey?: string): Promise<RecurlyPlan> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/plans/${planId}`, {
			method: 'DELETE',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Remove Plan')
		return (await response.json()) as RecurlyPlan
	}
}
