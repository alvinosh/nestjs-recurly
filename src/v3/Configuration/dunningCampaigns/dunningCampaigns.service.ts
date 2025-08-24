import { RECURLY_API_BASE_URL } from '../../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../../v3.helpers'
import { RecurlyListDunningCampaignsQueryDto, RecurlyDunningCampaignsBulkUpdateDto } from './dunningCampaigns.dtos'
import {
	RecurlyDunningCampaign,
	RecurlyDunningCampaignListResponse,
	RecurlyDunningCampaignsBulkUpdateResponse,
} from './dunningCampaigns.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class DunningCampaignsService {
	private readonly logger = new Logger(DunningCampaignsService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	/**
	 * List the dunning campaigns for a site
	 * @param params Query parameters for filtering and pagination
	 * @param apiKey Optional API key override
	 * @returns Promise<RecurlyDunningCampaignListResponse>
	 */
	async listDunningCampaigns(
		params?: RecurlyListDunningCampaignsQueryDto,
		apiKey?: string,
	): Promise<RecurlyDunningCampaignListResponse> {
		let url = `${RECURLY_API_BASE_URL}/dunning_campaigns`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Dunning Campaigns')
		return (await response.json()) as RecurlyDunningCampaignListResponse
	}

	/**
	 * Fetch a dunning campaign
	 * @param dunningCampaignId The ID of the dunning campaign to fetch
	 * @param apiKey Optional API key override
	 * @returns Promise<RecurlyDunningCampaign>
	 */
	async getDunningCampaign(dunningCampaignId: string, apiKey?: string): Promise<RecurlyDunningCampaign> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/dunning_campaigns/${dunningCampaignId}`, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get Dunning Campaign')
		return (await response.json()) as RecurlyDunningCampaign
	}

	/**
	 * Assign a dunning campaign to multiple plans
	 * @param dunningCampaignId The ID of the dunning campaign
	 * @param updateData The bulk update data containing plan codes or IDs
	 * @param apiKey Optional API key override
	 * @returns Promise<RecurlyDunningCampaignsBulkUpdateResponse>
	 */
	async bulkUpdateDunningCampaign(
		dunningCampaignId: string,
		updateData: RecurlyDunningCampaignsBulkUpdateDto,
		apiKey?: string,
	): Promise<RecurlyDunningCampaignsBulkUpdateResponse> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/dunning_campaigns/${dunningCampaignId}/bulk_update`, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(updateData),
		})

		await checkResponseIsOk(response, this.logger, 'Bulk Update Dunning Campaign')
		return (await response.json()) as RecurlyDunningCampaignsBulkUpdateResponse
	}
}
