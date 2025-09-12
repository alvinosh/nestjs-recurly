import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../v3.helpers'
import { CouponCreateDto, CouponListParamsDto, CouponUpdateDto } from './coupon.dto'
import { RecurlyCoupon, RecurlyCouponList } from './coupon.types'
import { RecurlyAPIConnection } from '@/v3/v3.types'
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
	async listCoupons(params: CouponListParamsDto = {}, config?: RecurlyAPIConnection): Promise<RecurlyCouponList> {
		let url = `${getBaseUrl(this.config, config?.location)}/coupons`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
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
	async createCoupon(data: CouponCreateDto, config?: RecurlyAPIConnection): Promise<RecurlyCoupon> {
		const url = `${getBaseUrl(this.config, config?.location)}/coupons`
		const response = await fetch(url, {
			method: 'POST',
			headers: getHeaders(this.config, config?.key),
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
	async getCoupon(couponId: string, config?: RecurlyAPIConnection): Promise<RecurlyCoupon> {
		const url = `${getBaseUrl(this.config, config?.location)}/coupons/${couponId}`
		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
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
	async updateCoupon(couponId: string, data: CouponUpdateDto, config?: RecurlyAPIConnection): Promise<RecurlyCoupon> {
		const url = `${getBaseUrl(this.config, config?.location)}/coupons/${couponId}`
		const response = await fetch(url, {
			method: 'PUT',
			headers: getHeaders(this.config, config?.key),
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
	async deactivateCoupon(couponId: string, config?: RecurlyAPIConnection): Promise<RecurlyCoupon> {
		const url = `${getBaseUrl(this.config, config?.location)}/coupons/${couponId}`
		const response = await fetch(url, {
			method: 'DELETE',
			headers: getHeaders(this.config, config?.key),
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
	async restoreCoupon(
		couponId: string,
		data: CouponUpdateDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyCoupon> {
		const url = `${getBaseUrl(this.config, config?.location)}/coupons/${couponId}/restore`
		const response = await fetch(url, {
			method: 'PUT',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(data),
		})
		await checkResponseIsOk(response, this.logger, 'Restore Coupon')
		return response.json()
	}
}
