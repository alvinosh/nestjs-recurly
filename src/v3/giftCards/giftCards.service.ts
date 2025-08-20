import { RecurlyConfigDto } from '../../config/config.dto'
import { InjectConfig } from '../../config/config.provider'
import { RECURLY_API_BASE_URL } from '../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../v3.helpers'
import { RecurlyListGiftCardsQueryDto, RecurlyCreateGiftCardDto, RecurlyRedeemGiftCardDto } from './giftCards.dto'
import { RecurlyGiftCard, RecurlyGiftCardListResponse } from './giftCards.types'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class GiftCardService {
	private readonly logger = new Logger(GiftCardService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listGiftCards(params?: RecurlyListGiftCardsQueryDto, apiKey?: string): Promise<RecurlyGiftCardListResponse> {
		let url = `${RECURLY_API_BASE_URL}/gift_cards`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Gift Cards')
		return (await response.json()) as RecurlyGiftCardListResponse
	}

	async createGiftCard(data: RecurlyCreateGiftCardDto, apiKey?: string): Promise<RecurlyGiftCard> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/gift_cards`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create Gift Card')
		return (await response.json()) as RecurlyGiftCard
	}

	async getGiftCard(giftCardId: string, apiKey?: string): Promise<RecurlyGiftCard> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/gift_cards/${giftCardId}`, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get Gift Card')
		return (await response.json()) as RecurlyGiftCard
	}

	async previewGiftCard(data: RecurlyCreateGiftCardDto, apiKey?: string): Promise<RecurlyGiftCard> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/gift_cards/preview`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Preview Gift Card')
		return (await response.json()) as RecurlyGiftCard
	}

	async redeemGiftCard(
		redemptionCode: string,
		data: RecurlyRedeemGiftCardDto,
		apiKey?: string,
	): Promise<RecurlyGiftCard> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/gift_cards/${redemptionCode}/redeem`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Redeem Gift Card')
		return (await response.json()) as RecurlyGiftCard
	}
}
