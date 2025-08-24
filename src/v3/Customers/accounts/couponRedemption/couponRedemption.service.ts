import { RecurlyConfigDto } from '../../../../config/config.dto'
import { InjectConfig } from '../../../../config/config.provider'
import { RECURLY_API_BASE_URL } from '../../../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../../../v3.helpers'
import { RecurlyListCouponRedemptionsQueryDto, RecurlyCouponRedemptionCreateDto } from './couponRedemption.dto'
import { RecurlyCouponRedemption, RecurlyCouponRedemptionList } from './couponRedemption.types'
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
		apiKey?: string,
	): Promise<RecurlyCouponRedemptionList> {
		let url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/coupon_redemptions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
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
	async listActiveCouponRedemptions(accountId: string, apiKey?: string): Promise<RecurlyCouponRedemptionList> {
		const url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/coupon_redemptions/active`

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
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
		apiKey?: string,
	): Promise<RecurlyCouponRedemption> {
		const url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/coupon_redemptions/active`

		const response = await fetch(url, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
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
	async removeCouponRedemption(accountId: string, apiKey?: string): Promise<RecurlyCouponRedemption> {
		const url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/coupon_redemptions/active`

		const response = await fetch(url, {
			method: 'DELETE',
			headers: getHeaders(this.config, apiKey),
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
		apiKey?: string,
	): Promise<RecurlyCouponRedemptionList> {
		let url = `${RECURLY_API_BASE_URL}/invoices/${invoiceId}/coupon_redemptions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
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
		apiKey?: string,
	): Promise<RecurlyCouponRedemptionList> {
		let url = `${RECURLY_API_BASE_URL}/subscriptions/${subscriptionId}/coupon_redemptions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Subscription Coupon Redemptions')
		return (await response.json()) as RecurlyCouponRedemptionList
	}
}
