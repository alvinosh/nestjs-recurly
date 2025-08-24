import { RECURLY_API_BASE_URL } from '../../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../../v3.helpers'
import {
	RecurlyListShippingMethodsQueryDto,
	RecurlyCreateShippingMethodDto,
	RecurlyUpdateShippingMethodDto,
} from './shippingMethod.dtos'
import { RecurlyShippingMethod, RecurlyShippingMethodListResponse } from './shippingMethod.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ShippingMethodService {
	private readonly logger = new Logger(ShippingMethodService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listShippingMethods(
		params?: RecurlyListShippingMethodsQueryDto,
		apiKey?: string,
	): Promise<RecurlyShippingMethodListResponse> {
		let url = `${RECURLY_API_BASE_URL}/shipping_methods`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Shipping Methods')
		return (await response.json()) as RecurlyShippingMethodListResponse
	}

	async getShippingMethod(shippingMethodId: string, apiKey?: string): Promise<RecurlyShippingMethod> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/shipping_methods/${shippingMethodId}`, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get Shipping Method')
		return (await response.json()) as RecurlyShippingMethod
	}

	async createShippingMethod(data: RecurlyCreateShippingMethodDto, apiKey?: string): Promise<RecurlyShippingMethod> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/shipping_methods`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create Shipping Method')
		return (await response.json()) as RecurlyShippingMethod
	}

	async updateShippingMethod(
		shippingMethodId: string,
		data: RecurlyUpdateShippingMethodDto,
		apiKey?: string,
	): Promise<RecurlyShippingMethod> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/shipping_methods/${shippingMethodId}`, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Update Shipping Method')
		return (await response.json()) as RecurlyShippingMethod
	}

	async deactivateShippingMethod(shippingMethodId: string, apiKey?: string): Promise<RecurlyShippingMethod> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/shipping_methods/${shippingMethodId}`, {
			method: 'DELETE',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Deactivate Shipping Method')
		return (await response.json()) as RecurlyShippingMethod
	}
}
