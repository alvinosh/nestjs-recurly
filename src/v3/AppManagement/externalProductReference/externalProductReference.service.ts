import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../v3.helpers'
import {
	RecurlyListExternalProductReferencesQueryDto,
	RecurlyCreateExternalProductReferenceDto,
} from './externalProductReference.dtos'
import {
	RecurlyExternalProductReferenceMini,
	RecurlyExternalProductReferenceListResponse,
} from './externalProductReference.types'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ExternalProductReferenceService {
	private readonly logger = new Logger(ExternalProductReferenceService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listExternalProductReferences(
		externalProductId: string,
		params?: RecurlyListExternalProductReferencesQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyExternalProductReferenceListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/external_products/${externalProductId}/external_product_references`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List External Product References')
		return (await response.json()) as RecurlyExternalProductReferenceListResponse
	}

	async getExternalProductReference(
		externalProductId: string,
		externalProductReferenceId: string,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyExternalProductReferenceMini> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/external_products/${externalProductId}/external_product_references/${externalProductReferenceId}`,
			{
				method: 'GET',
				headers: getHeaders(this.config, config?.key),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Get External Product Reference')
		return (await response.json()) as RecurlyExternalProductReferenceMini
	}

	async createExternalProductReference(
		externalProductId: string,
		data: RecurlyCreateExternalProductReferenceDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyExternalProductReferenceMini> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/external_products/${externalProductId}/external_product_references`,
			{
				method: 'POST',
				headers: getHeaders(this.config, config?.key),
				body: JSON.stringify(data),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Create External Product Reference')
		return (await response.json()) as RecurlyExternalProductReferenceMini
	}

	async deactivateExternalProductReference(
		externalProductId: string,
		externalProductReferenceId: string,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyExternalProductReferenceMini> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/external_products/${externalProductId}/external_product_references/${externalProductReferenceId}`,
			{
				method: 'DELETE',
				headers: getHeaders(this.config, config?.key),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Deactivate External Product Reference')
		return (await response.json()) as RecurlyExternalProductReferenceMini
	}
}
