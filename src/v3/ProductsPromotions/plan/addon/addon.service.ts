import { RecurlyConfigDto } from '../../../../config/config.dto'
import { InjectConfig } from '../../../../config/config.provider'
import { RECURLY_API_BASE_URL } from '../../../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../../../v3.helpers'
import { RecurlyCreatePlanAddOnDto, RecurlyListPlanAddOnsDto, RecurlyUpdatePlanAddOnDto } from './addon.dto'
import { RecurlyAddOn, RecurlyAddOnCreate, RecurlyAddOnList, RecurlyAddOnUpdate } from './addon.types'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class AddOnService {
	private readonly logger = new Logger(AddOnService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listPlanAddOns(
		planId: string,
		query: RecurlyListPlanAddOnsDto = {},
		apiKey?: string,
	): Promise<RecurlyAddOnList> {
		this.logger.log(`Listing add-ons for plan ${planId}`)
		let url = `${RECURLY_API_BASE_URL}/plans/${planId}/add_ons`

		if (query && Object.keys(query).length > 0) {
			url += '?' + buildQueryString(query)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Plan Add-ons')
		return (await response.json()) as RecurlyAddOnList
	}

	async createPlanAddOn(planId: string, data: RecurlyCreatePlanAddOnDto, apiKey?: string): Promise<RecurlyAddOn> {
		this.logger.log(`Creating add-on for plan ${planId}`)
		const body: RecurlyAddOnCreate = data

		const response = await fetch(`${RECURLY_API_BASE_URL}/plans/${planId}/add_ons`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(body),
		})

		await checkResponseIsOk(response, this.logger, 'Create Plan Add-on')
		return (await response.json()) as RecurlyAddOn
	}

	async getPlanAddOn(planId: string, addOnId: string, apiKey?: string): Promise<RecurlyAddOn> {
		this.logger.log(`Getting add-on ${addOnId} for plan ${planId}`)

		const response = await fetch(`${RECURLY_API_BASE_URL}/plans/${planId}/add_ons/${addOnId}`, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get Plan Add-on')
		return (await response.json()) as RecurlyAddOn
	}

	async updatePlanAddOn(
		planId: string,
		addOnId: string,
		data: RecurlyUpdatePlanAddOnDto,
		apiKey?: string,
	): Promise<RecurlyAddOn> {
		this.logger.log(`Updating add-on ${addOnId} for plan ${planId}`)
		const body: RecurlyAddOnUpdate = data

		const response = await fetch(`${RECURLY_API_BASE_URL}/plans/${planId}/add_ons/${addOnId}`, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(body),
		})

		await checkResponseIsOk(response, this.logger, 'Update Plan Add-on')
		return (await response.json()) as RecurlyAddOn
	}

	async removePlanAddOn(planId: string, addOnId: string, apiKey?: string): Promise<RecurlyAddOn> {
		this.logger.log(`Removing add-on ${addOnId} from plan ${planId}`)

		const response = await fetch(`${RECURLY_API_BASE_URL}/plans/${planId}/add_ons/${addOnId}`, {
			method: 'DELETE',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Remove Plan Add-on')
		return (await response.json()) as RecurlyAddOn
	}
}
