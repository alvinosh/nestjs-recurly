import { RecurlyListBusinessEntityInvoicesQueryDto } from '../../InvoicesPayments/invoice/invoice.dto'
import { RecurlyInvoiceListResponse } from '../../InvoicesPayments/invoice/invoice.types'
import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../v3.helpers'
import { RecurlyListBusinessEntitiesQueryDto } from './businessEntities.dtos'
import { RecurlyBusinessEntity, RecurlyBusinessEntityListResponse } from './businessEntities.types'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class BusinessEntitiesService {
	private readonly logger = new Logger(BusinessEntitiesService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	/**
	 * List all business entities for the site
	 */
	async listBusinessEntities(
		params?: RecurlyListBusinessEntitiesQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyBusinessEntityListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/business_entities`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Business Entities')
		return (await response.json()) as RecurlyBusinessEntityListResponse
	}

	/**
	 * Get a specific business entity by ID or code
	 */
	async getBusinessEntity(businessEntityId: string, config?: RecurlyAPIConnection): Promise<RecurlyBusinessEntity> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/business_entities/${businessEntityId}`,
			{
				method: 'GET',
				headers: getHeaders(this.config, config?.key),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Get Business Entity')
		return (await response.json()) as RecurlyBusinessEntity
	}

	/**
	 * List invoices for a specific business entity
	 */
	async listBusinessEntityInvoices(
		businessEntityId: string,
		params?: RecurlyListBusinessEntityInvoicesQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyInvoiceListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/business_entities/${businessEntityId}/invoices`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Business Entity Invoices')
		return (await response.json()) as RecurlyInvoiceListResponse
	}
}
