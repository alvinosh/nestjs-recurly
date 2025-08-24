import { RecurlyConfigDto } from '../../../../config/config.dto'
import { InjectConfig } from '../../../../config/config.provider'
import { RECURLY_API_BASE_URL } from '../../../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../../../v3.helpers'
import {
	RecurlyListShippingAddressesQueryDto,
	RecurlyAccountShippingAddressCreateDto,
	RecurlyAccountShippingAddressUpdateDto,
} from './shippingAddress.dto'
import { RecurlyShippingAddress, RecurlyShippingAddressList } from './shippingAddress.types'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ShippingAddressService {
	private readonly logger = new Logger(ShippingAddressService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	/**
	 * List an account's shipping addresses
	 * See the [Pagination Guide](/developers/guides/pagination.html) to learn how to use pagination in the API and Client Libraries.
	 * @param accountId - Account ID or code. For ID no prefix is used e.g. `e28zov4fw0v2`. For code use prefix `code-`, e.g. `code-bob`.
	 * @param params - Query parameters for filtering
	 * @param apiKey - Optional API key to use for this request
	 * @returns A list of an account's shipping addresses
	 */
	async listShippingAddresses(
		accountId: string,
		params?: RecurlyListShippingAddressesQueryDto,
		apiKey?: string,
	): Promise<RecurlyShippingAddressList> {
		let url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/shipping_addresses`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Shipping Addresses')
		return (await response.json()) as RecurlyShippingAddressList
	}

	/**
	 * Create a new shipping address for the account
	 * @param accountId - Account ID or code. For ID no prefix is used e.g. `e28zov4fw0v2`. For code use prefix `code-`, e.g. `code-bob`.
	 * @param shippingAddressData - The shipping address data to create
	 * @param apiKey - Optional API key to use for this request
	 * @returns The newly created shipping address
	 */
	async createShippingAddress(
		accountId: string,
		shippingAddressData: RecurlyAccountShippingAddressCreateDto,
		apiKey?: string,
	): Promise<RecurlyShippingAddress> {
		const url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/shipping_addresses`

		const response = await fetch(url, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(shippingAddressData),
		})

		await checkResponseIsOk(response, this.logger, 'Create Shipping Address')
		return (await response.json()) as RecurlyShippingAddress
	}

	/**
	 * Fetch an account's shipping address
	 * @param accountId - Account ID or code. For ID no prefix is used e.g. `e28zov4fw0v2`. For code use prefix `code-`, e.g. `code-bob`.
	 * @param shippingAddressId - Shipping Address ID
	 * @param apiKey - Optional API key to use for this request
	 * @returns A shipping address
	 */
	async getShippingAddress(
		accountId: string,
		shippingAddressId: string,
		apiKey?: string,
	): Promise<RecurlyShippingAddress> {
		const url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/shipping_addresses/${shippingAddressId}`

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get Shipping Address')
		return (await response.json()) as RecurlyShippingAddress
	}

	/**
	 * Update an account's shipping address
	 * @param accountId - Account ID or code. For ID no prefix is used e.g. `e28zov4fw0v2`. For code use prefix `code-`, e.g. `code-bob`.
	 * @param shippingAddressId - Shipping Address ID
	 * @param shippingAddressData - The shipping address data to update
	 * @param apiKey - Optional API key to use for this request
	 * @returns The updated shipping address
	 */
	async updateShippingAddress(
		accountId: string,
		shippingAddressId: string,
		shippingAddressData: RecurlyAccountShippingAddressUpdateDto,
		apiKey?: string,
	): Promise<RecurlyShippingAddress> {
		const url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/shipping_addresses/${shippingAddressId}`

		const response = await fetch(url, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(shippingAddressData),
		})

		await checkResponseIsOk(response, this.logger, 'Update Shipping Address')
		return (await response.json()) as RecurlyShippingAddress
	}

	/**
	 * Remove an account's shipping address
	 * @param accountId - Account ID or code. For ID no prefix is used e.g. `e28zov4fw0v2`. For code use prefix `code-`, e.g. `code-bob`.
	 * @param shippingAddressId - Shipping Address ID
	 * @param apiKey - Optional API key to use for this request
	 * @returns void
	 */
	async removeShippingAddress(accountId: string, shippingAddressId: string, apiKey?: string): Promise<void> {
		const url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/shipping_addresses/${shippingAddressId}`

		const response = await fetch(url, {
			method: 'DELETE',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Remove Shipping Address')
	}
}
