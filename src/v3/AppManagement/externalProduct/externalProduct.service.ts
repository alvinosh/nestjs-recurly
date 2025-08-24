import { RECURLY_API_BASE_URL } from '../../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../../v3.helpers'
import {
	RecurlyListExternalProductsQueryDto,
	RecurlyCreateExternalProductDto,
	RecurlyUpdateExternalProductDto,
	RecurlyListExternalProductReferencesQueryDto,
	RecurlyExternalProductReferenceCreateDto,
} from './externalProduct.dtos'
import {
	RecurlyExternalProduct,
	RecurlyExternalProductListResponse,
	RecurlyExternalProductReferenceMini,
	RecurlyExternalProductReferenceCollectionResponse,
} from './externalProduct.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ExternalProductService {
	private readonly logger = new Logger(ExternalProductService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	/**
	 * List external products
	 */
	async listExternalProducts(
		params?: RecurlyListExternalProductsQueryDto,
		apiKey?: string,
	): Promise<RecurlyExternalProductListResponse> {
		let url = `${RECURLY_API_BASE_URL}/external_products`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List External Products')
		return (await response.json()) as RecurlyExternalProductListResponse
	}

	/**
	 * Create external product
	 */
	async createExternalProduct(
		data: RecurlyCreateExternalProductDto,
		apiKey?: string,
	): Promise<RecurlyExternalProduct> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/external_products`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create External Product')
		return (await response.json()) as RecurlyExternalProduct
	}

	/**
	 * Get external product
	 */
	async getExternalProduct(externalProductId: string, apiKey?: string): Promise<RecurlyExternalProduct> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/external_products/${externalProductId}`, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get External Product')
		return (await response.json()) as RecurlyExternalProduct
	}

	/**
	 * Update external product
	 */
	async updateExternalProduct(
		externalProductId: string,
		data: RecurlyUpdateExternalProductDto,
		apiKey?: string,
	): Promise<RecurlyExternalProduct> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/external_products/${externalProductId}`, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Update External Product')
		return (await response.json()) as RecurlyExternalProduct
	}

	/**
	 * Deactivate external products
	 */
	async deactivateExternalProducts(apiKey?: string): Promise<RecurlyExternalProductListResponse> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/external_products`, {
			method: 'DELETE',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Deactivate External Products')
		return (await response.json()) as RecurlyExternalProductListResponse
	}

	/**
	 * List external product references for a specific external product
	 */
	async listExternalProductReferences(
		externalProductId: string,
		params?: RecurlyListExternalProductReferencesQueryDto,
		apiKey?: string,
	): Promise<RecurlyExternalProductReferenceCollectionResponse> {
		let url = `${RECURLY_API_BASE_URL}/external_products/${externalProductId}/external_product_references`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List External Product References')
		return (await response.json()) as RecurlyExternalProductReferenceCollectionResponse
	}

	/**
	 * Create external product reference
	 */
	async createExternalProductReference(
		externalProductId: string,
		data: RecurlyExternalProductReferenceCreateDto,
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

	/**
	 * Get external product reference
	 */
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

	/**
	 * Deactivate external product reference
	 */
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
