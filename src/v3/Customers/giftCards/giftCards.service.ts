import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../v3.helpers'
import { RecurlyListGiftCardsQueryDto, RecurlyCreateGiftCardDto, RecurlyRedeemGiftCardDto } from './giftCards.dto'
import { RecurlyGiftCard, RecurlyGiftCardListResponse } from './giftCards.types'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class GiftCardService {
	private readonly logger = new Logger(GiftCardService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listGiftCards(
		params?: RecurlyListGiftCardsQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyGiftCardListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/gift_cards`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Gift Cards')
		return (await response.json()) as RecurlyGiftCardListResponse
	}

	async createGiftCard(data: RecurlyCreateGiftCardDto, config?: RecurlyAPIConnection): Promise<RecurlyGiftCard> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/gift_cards`, {
			method: 'POST',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create Gift Card')
		return (await response.json()) as RecurlyGiftCard
	}

	async getGiftCard(giftCardId: string, config?: RecurlyAPIConnection): Promise<RecurlyGiftCard> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/gift_cards/${giftCardId}`, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Get Gift Card')
		return (await response.json()) as RecurlyGiftCard
	}

	async previewGiftCard(data: RecurlyCreateGiftCardDto, config?: RecurlyAPIConnection): Promise<RecurlyGiftCard> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/gift_cards/preview`, {
			method: 'POST',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Preview Gift Card')
		return (await response.json()) as RecurlyGiftCard
	}

	async redeemGiftCard(
		redemptionCode: string,
		data: RecurlyRedeemGiftCardDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyGiftCard> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/gift_cards/${redemptionCode}/redeem`,
			{
				method: 'POST',
				headers: getHeaders(this.config, config?.key),
				body: JSON.stringify(data),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Redeem Gift Card')
		return (await response.json()) as RecurlyGiftCard
	}
}
