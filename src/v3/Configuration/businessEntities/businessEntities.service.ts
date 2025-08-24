import { RecurlyListBusinessEntityInvoicesQueryDto } from '../../InvoicesPayments/invoice/invoice.dto'
import { RecurlyInvoiceListResponse } from '../../InvoicesPayments/invoice/invoice.types'
import { RECURLY_API_BASE_URL } from '../../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../../v3.helpers'
import { RecurlyListBusinessEntitiesQueryDto } from './businessEntities.dtos'
import { RecurlyBusinessEntity, RecurlyBusinessEntityListResponse } from './businessEntities.types'
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
		apiKey?: string,
	): Promise<RecurlyBusinessEntityListResponse> {
		let url = `${RECURLY_API_BASE_URL}/business_entities`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Business Entities')
		return (await response.json()) as RecurlyBusinessEntityListResponse
	}

	/**
	 * Get a specific business entity by ID or code
	 */
	async getBusinessEntity(businessEntityId: string, apiKey?: string): Promise<RecurlyBusinessEntity> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/business_entities/${businessEntityId}`, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get Business Entity')
		return (await response.json()) as RecurlyBusinessEntity
	}

	/**
	 * List invoices for a specific business entity
	 */
	async listBusinessEntityInvoices(
		businessEntityId: string,
		params?: RecurlyListBusinessEntityInvoicesQueryDto,
		apiKey?: string,
	): Promise<RecurlyInvoiceListResponse> {
		let url = `${RECURLY_API_BASE_URL}/business_entities/${businessEntityId}/invoices`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Business Entity Invoices')
		return (await response.json()) as RecurlyInvoiceListResponse
	}
}
