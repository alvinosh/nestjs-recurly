import { RECURLY_API_BASE_URL } from '../../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../../v3.helpers'
import { RecurlyListCustomFieldDefinitionsQueryDto } from './customFieldDefinition.dtos'
import { RecurlyCustomFieldDefinition, RecurlyCustomFieldDefinitionListResponse } from './customFieldDefinition.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class CustomFieldDefinitionService {
	private readonly logger = new Logger(CustomFieldDefinitionService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listCustomFieldDefinitions(
		params?: RecurlyListCustomFieldDefinitionsQueryDto,
		apiKey?: string,
	): Promise<RecurlyCustomFieldDefinitionListResponse> {
		let url = `${RECURLY_API_BASE_URL}/custom_field_definitions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Custom Field Definitions')
		return (await response.json()) as RecurlyCustomFieldDefinitionListResponse
	}

	async getCustomFieldDefinition(
		customFieldDefinitionId: string,
		apiKey?: string,
	): Promise<RecurlyCustomFieldDefinition> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/custom_field_definitions/${customFieldDefinitionId}`, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get Custom Field Definition')
		return (await response.json()) as RecurlyCustomFieldDefinition
	}
}
