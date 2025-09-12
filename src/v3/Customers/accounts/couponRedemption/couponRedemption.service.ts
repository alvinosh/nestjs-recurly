import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../../v3.helpers'
import { RecurlyListCouponRedemptionsQueryDto, RecurlyCouponRedemptionCreateDto } from './couponRedemption.dto'
import { RecurlyCouponRedemption, RecurlyCouponRedemptionList } from './couponRedemption.types'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class CouponRedemptionService {
	private readonly logger = new Logger(CouponRedemptionService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	/**
	 * List the coupon redemptions for an account
	 * @param accountId Account ID
	 * @param params Query parameters
	 * @param apiKey Optional API key override
	 * @returns List of coupon redemptions
	 */
	async listAccountCouponRedemptions(
		accountId: string,
		params?: RecurlyListCouponRedemptionsQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyCouponRedemptionList> {
		let url = `${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/coupon_redemptions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Account Coupon Redemptions')
		return (await response.json()) as RecurlyCouponRedemptionList
	}

	/**
	 * List the coupon redemptions that are active on an account
	 * @param accountId Account ID
	 * @param apiKey Optional API key override
	 * @returns List of active coupon redemptions
	 */
	async listActiveCouponRedemptions(
		accountId: string,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyCouponRedemptionList> {
		const url = `${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/coupon_redemptions/active`

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Active Coupon Redemptions')
		return (await response.json()) as RecurlyCouponRedemptionList
	}

	/**
	 * Generate an active coupon redemption on an account or subscription
	 * @param accountId Account ID
	 * @param data Coupon redemption data
	 * @param apiKey Optional API key override
	 * @returns Created coupon redemption
	 */
	async createCouponRedemption(
		accountId: string,
		data: RecurlyCouponRedemptionCreateDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyCouponRedemption> {
		const url = `${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/coupon_redemptions/active`

		const response = await fetch(url, {
			method: 'POST',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create Coupon Redemption')
		return (await response.json()) as RecurlyCouponRedemption
	}

	/**
	 * Delete the active coupon redemption from an account
	 * @param accountId Account ID
	 * @param apiKey Optional API key override
	 * @returns Removed coupon redemption
	 */
	async removeCouponRedemption(accountId: string, config?: RecurlyAPIConnection): Promise<RecurlyCouponRedemption> {
		const url = `${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/coupon_redemptions/active`

		const response = await fetch(url, {
			method: 'DELETE',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Remove Coupon Redemption')
		return (await response.json()) as RecurlyCouponRedemption
	}

	/**
	 * List the coupon redemptions applied to an invoice
	 * @param invoiceId Invoice ID
	 * @param params Query parameters
	 * @param apiKey Optional API key override
	 * @returns List of coupon redemptions
	 */
	async listInvoiceCouponRedemptions(
		invoiceId: string,
		params?: RecurlyListCouponRedemptionsQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyCouponRedemptionList> {
		let url = `${getBaseUrl(this.config, config?.location)}/invoices/${invoiceId}/coupon_redemptions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Invoice Coupon Redemptions')
		return (await response.json()) as RecurlyCouponRedemptionList
	}

	/**
	 * List the coupon redemptions for a subscription
	 * @param subscriptionId Subscription ID
	 * @param params Query parameters
	 * @param apiKey Optional API key override
	 * @returns List of coupon redemptions
	 */
	async listSubscriptionCouponRedemptions(
		subscriptionId: string,
		params?: RecurlyListCouponRedemptionsQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyCouponRedemptionList> {
		let url = `${getBaseUrl(this.config, config?.location)}/subscriptions/${subscriptionId}/coupon_redemptions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Subscription Coupon Redemptions')
		return (await response.json()) as RecurlyCouponRedemptionList
	}
}
