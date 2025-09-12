import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../../v3.helpers'
import { RecurlyCreatePlanAddOnDto, RecurlyListPlanAddOnsDto, RecurlyUpdatePlanAddOnDto } from './addon.dto'
import { RecurlyAddOn, RecurlyAddOnCreate, RecurlyAddOnList, RecurlyAddOnUpdate } from './addon.types'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class AddOnService {
	private readonly logger = new Logger(AddOnService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listPlanAddOns(
		planId: string,
		query: RecurlyListPlanAddOnsDto = {},
		config?: RecurlyAPIConnection,
	): Promise<RecurlyAddOnList> {
		this.logger.log(`Listing add-ons for plan ${planId}`)
		let url = `${getBaseUrl(this.config, config?.location)}/plans/${planId}/add_ons`

		if (query && Object.keys(query).length > 0) {
			url += '?' + buildQueryString(query)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Plan Add-ons')
		return (await response.json()) as RecurlyAddOnList
	}

	async createPlanAddOn(
		planId: string,
		data: RecurlyCreatePlanAddOnDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyAddOn> {
		this.logger.log(`Creating add-on for plan ${planId}`)
		const body: RecurlyAddOnCreate = data

		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/plans/${planId}/add_ons`, {
			method: 'POST',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(body),
		})

		await checkResponseIsOk(response, this.logger, 'Create Plan Add-on')
		return (await response.json()) as RecurlyAddOn
	}

	async getPlanAddOn(planId: string, addOnId: string, config?: RecurlyAPIConnection): Promise<RecurlyAddOn> {
		this.logger.log(`Getting add-on ${addOnId} for plan ${planId}`)

		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/plans/${planId}/add_ons/${addOnId}`,
			{
				method: 'GET',
				headers: getHeaders(this.config, config?.key),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Get Plan Add-on')
		return (await response.json()) as RecurlyAddOn
	}

	async updatePlanAddOn(
		planId: string,
		addOnId: string,
		data: RecurlyUpdatePlanAddOnDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyAddOn> {
		this.logger.log(`Updating add-on ${addOnId} for plan ${planId}`)
		const body: RecurlyAddOnUpdate = data

		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/plans/${planId}/add_ons/${addOnId}`,
			{
				method: 'PUT',
				headers: getHeaders(this.config, config?.key),
				body: JSON.stringify(body),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Update Plan Add-on')
		return (await response.json()) as RecurlyAddOn
	}

	async removePlanAddOn(planId: string, addOnId: string, config?: RecurlyAPIConnection): Promise<RecurlyAddOn> {
		this.logger.log(`Removing add-on ${addOnId} from plan ${planId}`)

		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/plans/${planId}/add_ons/${addOnId}`,
			{
				method: 'DELETE',
				headers: getHeaders(this.config, config?.key),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Remove Plan Add-on')
		return (await response.json()) as RecurlyAddOn
	}
}
