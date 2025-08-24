import { RECURLY_API_BASE_URL } from '../../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../../v3.helpers'
import { CouponCreateDto, CouponListParamsDto, CouponUpdateDto } from './coupon.dto'
import { RecurlyCoupon, RecurlyCouponList } from './coupon.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class CouponService {
	private readonly logger = new Logger(CouponService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	/**
	 * List all coupons for the site
	 * @param params Query parameters to filter coupons
	 * @param apiKey Optional API key override
	 * @returns List of coupons
	 */
	async listCoupons(params: CouponListParamsDto = {}, apiKey?: string): Promise<RecurlyCouponList> {
		let url = `${RECURLY_API_BASE_URL}/coupons`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})
		await checkResponseIsOk(response, this.logger, 'List Coupons')
		return response.json()
	}

	/**
	 * Create a coupon
	 * @param data Coupon data
	 * @param apiKey Optional API key override
	 * @returns Created coupon
	 */
	async createCoupon(data: CouponCreateDto, apiKey?: string): Promise<RecurlyCoupon> {
		const url = `${RECURLY_API_BASE_URL}/coupons`
		const response = await fetch(url, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})
		await checkResponseIsOk(response, this.logger, 'Create Coupon')
		return response.json()
	}

	/**
	 * Fetch a coupon
	 * @param couponId Coupon ID
	 * @param apiKey Optional API key override
	 * @returns Coupon details
	 */
	async getCoupon(couponId: string, apiKey?: string): Promise<RecurlyCoupon> {
		const url = `${RECURLY_API_BASE_URL}/coupons/${couponId}`
		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})
		await checkResponseIsOk(response, this.logger, 'Get Coupon')
		return response.json()
	}

	/**
	 * Update an active coupon
	 * @param couponId Coupon ID
	 * @param data Update data
	 * @param apiKey Optional API key override
	 * @returns Updated coupon
	 */
	async updateCoupon(couponId: string, data: CouponUpdateDto, apiKey?: string): Promise<RecurlyCoupon> {
		const url = `${RECURLY_API_BASE_URL}/coupons/${couponId}`
		const response = await fetch(url, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})
		await checkResponseIsOk(response, this.logger, 'Update Coupon')
		return response.json()
	}

	/**
	 * Expire a coupon
	 * @param couponId Coupon ID
	 * @param apiKey Optional API key override
	 * @returns Deactivated coupon
	 */
	async deactivateCoupon(couponId: string, apiKey?: string): Promise<RecurlyCoupon> {
		const url = `${RECURLY_API_BASE_URL}/coupons/${couponId}`
		const response = await fetch(url, {
			method: 'DELETE',
			headers: getHeaders(this.config, apiKey),
		})
		await checkResponseIsOk(response, this.logger, 'Deactivate Coupon')
		return response.json()
	}

	/**
	 * Restore an inactive coupon
	 * @param couponId Coupon ID
	 * @param data Update data to apply when restoring
	 * @param apiKey Optional API key override
	 * @returns Restored coupon
	 */
	async restoreCoupon(couponId: string, data: CouponUpdateDto, apiKey?: string): Promise<RecurlyCoupon> {
		const url = `${RECURLY_API_BASE_URL}/coupons/${couponId}/restore`
		const response = await fetch(url, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})
		await checkResponseIsOk(response, this.logger, 'Restore Coupon')
		return response.json()
	}
}
