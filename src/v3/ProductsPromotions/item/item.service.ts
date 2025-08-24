import { RECURLY_API_BASE_URL } from '../../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../../v3.helpers'
import { RecurlyListItemsQueryDto, RecurlyCreateItemDto, RecurlyUpdateItemDto } from './item.dto'
import { RecurlyItem, RecurlyItemListResponse } from './item.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ItemService {
	private readonly logger = new Logger(ItemService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listItems(params?: RecurlyListItemsQueryDto, apiKey?: string): Promise<RecurlyItemListResponse> {
		let url = `${RECURLY_API_BASE_URL}/items`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Items')
		return (await response.json()) as RecurlyItemListResponse
	}

	async createItem(data: RecurlyCreateItemDto, apiKey?: string): Promise<RecurlyItem> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/items`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create Item')
		return (await response.json()) as RecurlyItem
	}

	async getItem(itemId: string, apiKey?: string): Promise<RecurlyItem> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/items/${itemId}`, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get Item')
		return (await response.json()) as RecurlyItem
	}

	async updateItem(itemId: string, data: RecurlyUpdateItemDto, apiKey?: string): Promise<RecurlyItem> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/items/${itemId}`, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Update Item')
		return (await response.json()) as RecurlyItem
	}

	async deactivateItem(itemId: string, apiKey?: string): Promise<RecurlyItem> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/items/${itemId}`, {
			method: 'DELETE',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Deactivate Item')
		return (await response.json()) as RecurlyItem
	}

	async reactivateItem(itemId: string, apiKey?: string): Promise<RecurlyItem> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/items/${itemId}/reactivate`, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Reactivate Item')
		return (await response.json()) as RecurlyItem
	}
}
