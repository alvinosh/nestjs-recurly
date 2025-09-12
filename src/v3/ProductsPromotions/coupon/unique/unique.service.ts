import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../../v3.helpers'
import { RecurlyGenerateUniqueCouponCodesDto, RecurlyListUniqueCouponCodesDto } from './unique.dto'
import { RecurlyUniqueCouponCode, RecurlyUniqueCouponCodeList, RecurlyUniqueCouponCodeParams } from './unique.types'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class UniqueCouponCodeService {
	private readonly logger = new Logger(UniqueCouponCodeService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async generateUniqueCouponCodes(
		couponId: string,
		data: RecurlyGenerateUniqueCouponCodesDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyUniqueCouponCodeParams> {
		this.logger.log(`Generating unique coupon codes for coupon ${couponId}`)

		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/coupons/${couponId}/generate`, {
			method: 'POST',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Generate Unique Coupon Codes')
		return (await response.json()) as RecurlyUniqueCouponCodeParams
	}

	async listUniqueCouponCodes(
		couponId: string,
		query: RecurlyListUniqueCouponCodesDto = {},
		config?: RecurlyAPIConnection,
	): Promise<RecurlyUniqueCouponCodeList> {
		this.logger.log(`Listing unique coupon codes for coupon ${couponId}`)
		let url = `${getBaseUrl(this.config, config?.location)}/coupons/${couponId}/unique_coupon_codes`

		if (query && Object.keys(query).length > 0) {
			url += '?' + buildQueryString(query)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Unique Coupon Codes')
		return (await response.json()) as RecurlyUniqueCouponCodeList
	}

	async getUniqueCouponCode(
		uniqueCouponCodeId: string,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyUniqueCouponCode> {
		this.logger.log(`Getting unique coupon code ${uniqueCouponCodeId}`)

		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/unique_coupon_codes/${uniqueCouponCodeId}`,
			{
				method: 'GET',
				headers: getHeaders(this.config, config?.key),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Get Unique Coupon Code')
		return (await response.json()) as RecurlyUniqueCouponCode
	}

	async deactivateUniqueCouponCode(
		uniqueCouponCodeId: string,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyUniqueCouponCode> {
		this.logger.log(`Deactivating unique coupon code ${uniqueCouponCodeId}`)

		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/unique_coupon_codes/${uniqueCouponCodeId}`,
			{
				method: 'DELETE',
				headers: getHeaders(this.config, config?.key),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Deactivate Unique Coupon Code')
		return (await response.json()) as RecurlyUniqueCouponCode
	}

	async reactivateUniqueCouponCode(
		uniqueCouponCodeId: string,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyUniqueCouponCode> {
		this.logger.log(`Reactivating unique coupon code ${uniqueCouponCodeId}`)

		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/unique_coupon_codes/${uniqueCouponCodeId}/restore`,
			{
				method: 'PUT',
				headers: getHeaders(this.config, config?.key),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Reactivate Unique Coupon Code')
		return (await response.json()) as RecurlyUniqueCouponCode
	}
}
