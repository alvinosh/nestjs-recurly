import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../v3.helpers'
import { RecurlyListPlansQueryDto, RecurlyCreatePlanDto, RecurlyUpdatePlanDto } from './plan.dto'
import { RecurlyPlan, RecurlyPlanListResponse } from './plan.types'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class PlanService {
	private readonly logger = new Logger(PlanService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listPlans(
		params?: RecurlyListPlansQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyPlanListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/plans`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Plans')
		return (await response.json()) as RecurlyPlanListResponse
	}

	async createPlan(data: RecurlyCreatePlanDto, config?: RecurlyAPIConnection): Promise<RecurlyPlan> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/plans`, {
			method: 'POST',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create Plan')
		return (await response.json()) as RecurlyPlan
	}

	async getPlan(planId: string, config?: RecurlyAPIConnection): Promise<RecurlyPlan> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/plans/${planId}`, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Get Plan')
		return (await response.json()) as RecurlyPlan
	}

	async updatePlan(planId: string, data: RecurlyUpdatePlanDto, config?: RecurlyAPIConnection): Promise<RecurlyPlan> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/plans/${planId}`, {
			method: 'PUT',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Update Plan')
		return (await response.json()) as RecurlyPlan
	}

	async removePlan(planId: string, config?: RecurlyAPIConnection): Promise<RecurlyPlan> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/plans/${planId}`, {
			method: 'DELETE',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Remove Plan')
		return (await response.json()) as RecurlyPlan
	}
}
