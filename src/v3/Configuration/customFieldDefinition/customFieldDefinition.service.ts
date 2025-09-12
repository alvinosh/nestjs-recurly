import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../v3.helpers'
import { RecurlyListCustomFieldDefinitionsQueryDto } from './customFieldDefinition.dtos'
import { RecurlyCustomFieldDefinition, RecurlyCustomFieldDefinitionListResponse } from './customFieldDefinition.types'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class CustomFieldDefinitionService {
	private readonly logger = new Logger(CustomFieldDefinitionService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listCustomFieldDefinitions(
		params?: RecurlyListCustomFieldDefinitionsQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyCustomFieldDefinitionListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/custom_field_definitions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Custom Field Definitions')
		return (await response.json()) as RecurlyCustomFieldDefinitionListResponse
	}

	async getCustomFieldDefinition(
		customFieldDefinitionId: string,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyCustomFieldDefinition> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/custom_field_definitions/${customFieldDefinitionId}`,
			{
				method: 'GET',
				headers: getHeaders(this.config, config?.key),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Get Custom Field Definition')
		return (await response.json()) as RecurlyCustomFieldDefinition
	}
}
