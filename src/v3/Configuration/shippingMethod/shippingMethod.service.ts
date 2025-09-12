import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../v3.helpers'
import {
	RecurlyListShippingMethodsQueryDto,
	RecurlyCreateShippingMethodDto,
	RecurlyUpdateShippingMethodDto,
} from './shippingMethod.dtos'
import { RecurlyShippingMethod, RecurlyShippingMethodListResponse } from './shippingMethod.types'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ShippingMethodService {
	private readonly logger = new Logger(ShippingMethodService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listShippingMethods(
		params?: RecurlyListShippingMethodsQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyShippingMethodListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/shipping_methods`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Shipping Methods')
		return (await response.json()) as RecurlyShippingMethodListResponse
	}

	async getShippingMethod(shippingMethodId: string, config?: RecurlyAPIConnection): Promise<RecurlyShippingMethod> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/shipping_methods/${shippingMethodId}`,
			{
				method: 'GET',
				headers: getHeaders(this.config, config?.key),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Get Shipping Method')
		return (await response.json()) as RecurlyShippingMethod
	}

	async createShippingMethod(
		data: RecurlyCreateShippingMethodDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyShippingMethod> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/shipping_methods`, {
			method: 'POST',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create Shipping Method')
		return (await response.json()) as RecurlyShippingMethod
	}

	async updateShippingMethod(
		shippingMethodId: string,
		data: RecurlyUpdateShippingMethodDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyShippingMethod> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/shipping_methods/${shippingMethodId}`,
			{
				method: 'PUT',
				headers: getHeaders(this.config, config?.key),
				body: JSON.stringify(data),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Update Shipping Method')
		return (await response.json()) as RecurlyShippingMethod
	}

	async deactivateShippingMethod(
		shippingMethodId: string,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyShippingMethod> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/shipping_methods/${shippingMethodId}`,
			{
				method: 'DELETE',
				headers: getHeaders(this.config, config?.key),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Deactivate Shipping Method')
		return (await response.json()) as RecurlyShippingMethod
	}
}
