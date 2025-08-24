import { RECURLY_API_BASE_URL } from '../../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../../v3.helpers'
import {
	RecurlyListExternalProductReferencesQueryDto,
	RecurlyCreateExternalProductReferenceDto,
} from './externalProductReference.dtos'
import {
	RecurlyExternalProductReferenceMini,
	RecurlyExternalProductReferenceListResponse,
} from './externalProductReference.types'
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
		apiKey?: string,
	): Promise<RecurlyExternalProductReferenceListResponse> {
		let url = `${RECURLY_API_BASE_URL}/external_products/${externalProductId}/external_product_references`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List External Product References')
		return (await response.json()) as RecurlyExternalProductReferenceListResponse
	}

	async getExternalProductReference(
		externalProductId: string,
		externalProductReferenceId: string,
		apiKey?: string,
	): Promise<RecurlyExternalProductReferenceMini> {
		const response = await fetch(
			`${RECURLY_API_BASE_URL}/external_products/${externalProductId}/external_product_references/${externalProductReferenceId}`,
			{
				method: 'GET',
				headers: getHeaders(this.config, apiKey),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Get External Product Reference')
		return (await response.json()) as RecurlyExternalProductReferenceMini
	}

	async createExternalProductReference(
		externalProductId: string,
		data: RecurlyCreateExternalProductReferenceDto,
		apiKey?: string,
	): Promise<RecurlyExternalProductReferenceMini> {
		const response = await fetch(
			`${RECURLY_API_BASE_URL}/external_products/${externalProductId}/external_product_references`,
			{
				method: 'POST',
				headers: getHeaders(this.config, apiKey),
				body: JSON.stringify(data),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Create External Product Reference')
		return (await response.json()) as RecurlyExternalProductReferenceMini
	}

	async deactivateExternalProductReference(
		externalProductId: string,
		externalProductReferenceId: string,
		apiKey?: string,
	): Promise<RecurlyExternalProductReferenceMini> {
		const response = await fetch(
			`${RECURLY_API_BASE_URL}/external_products/${externalProductId}/external_product_references/${externalProductReferenceId}`,
			{
				method: 'DELETE',
				headers: getHeaders(this.config, apiKey),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Deactivate External Product Reference')
		return (await response.json()) as RecurlyExternalProductReferenceMini
	}
}
