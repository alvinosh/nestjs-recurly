import { RecurlyTransaction } from '../../../../InvoicesPayments/transaction/transaction.types'
import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../../../v3.helpers'
import { RecurlyBillingInfo } from '../info/info.types'
import {
	RecurlyCreateBillingInfoDto,
	RecurlyListBillingInfosQueryDto,
	RecurlyUpdateBillingInfoDto,
	RecurlyVerifyBillingInfoCVVDto,
	RecurlyVerifyBillingInfoDto,
} from './infos.dto'
import { RecurlyBillingInfoListResponse } from './infos.types'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class BillingInfosService {
	private readonly logger = new Logger(BillingInfosService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	/**
	 * Get the list of billing information associated with an account
	 * @see https://recurly.com/developers/api/v2021-02-25/index.html#operation/list_billing_infos
	 */
	async listBillingInfos(
		accountId: string,
		params?: RecurlyListBillingInfosQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyBillingInfoListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/billing_infos`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Billing Infos')
		return (await response.json()) as RecurlyBillingInfoListResponse
	}

	/**
	 * Add new billing information on an account
	 * @see https://recurly.com/developers/api/v2021-02-25/index.html#operation/create_billing_info
	 */
	async createBillingInfo(
		accountId: string,
		data: RecurlyCreateBillingInfoDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyBillingInfo> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/billing_infos`,
			{
				method: 'POST',
				headers: getHeaders(this.config, config?.key),
				body: JSON.stringify(data),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Create Billing Info')
		return (await response.json()) as RecurlyBillingInfo
	}

	/**
	 * Fetch a billing info
	 * @see https://recurly.com/developers/api/v2021-02-25/index.html#operation/get_a_billing_info
	 */
	async getBillingInfo(
		accountId: string,
		billingInfoId: string,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyBillingInfo> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/billing_infos/${billingInfoId}`,
			{
				method: 'GET',
				headers: getHeaders(this.config, config?.key),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Get Billing Info')
		return (await response.json()) as RecurlyBillingInfo
	}

	/**
	 * Update an account's billing information
	 * @see https://recurly.com/developers/api/v2021-02-25/index.html#operation/update_a_billing_info
	 */
	async updateBillingInfo(
		accountId: string,
		billingInfoId: string,
		data: RecurlyUpdateBillingInfoDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyBillingInfo> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/billing_infos/${billingInfoId}`,
			{
				method: 'PUT',
				headers: getHeaders(this.config, config?.key),
				body: JSON.stringify(data),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Update Billing Info')
		return (await response.json()) as RecurlyBillingInfo
	}

	/**
	 * Remove an account's billing information
	 * @see https://recurly.com/developers/api/v2021-02-25/index.html#operation/remove_a_billing_info
	 */
	async removeBillingInfo(accountId: string, billingInfoId: string, config?: RecurlyAPIConnection): Promise<void> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/billing_infos/${billingInfoId}`,
			{
				method: 'DELETE',
				headers: getHeaders(this.config, config?.key),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Remove Billing Info')
	}

	/**
	 * Verify a billing information's credit card
	 * @see https://recurly.com/developers/api/v2021-02-25/index.html#operation/verify_billing_infos
	 */
	async verifyBillingInfo(
		accountId: string,
		billingInfoId: string,
		data?: RecurlyVerifyBillingInfoDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyTransaction> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/billing_infos/${billingInfoId}/verify`,
			{
				method: 'POST',
				headers: getHeaders(this.config, config?.key),
				body: data ? JSON.stringify(data) : undefined,
			},
		)

		await checkResponseIsOk(response, this.logger, 'Verify Billing Info')
		return (await response.json()) as RecurlyTransaction
	}

	/**
	 * Verify a billing information's credit card cvv
	 * @see https://recurly.com/developers/api/v2021-02-25/index.html#operation/verify_billing_infos_cvv
	 */
	async verifyBillingInfoCVV(
		accountId: string,
		billingInfoId: string,
		data: RecurlyVerifyBillingInfoCVVDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyTransaction> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/billing_infos/${billingInfoId}/verify_cvv`,
			{
				method: 'POST',
				headers: getHeaders(this.config, config?.key),
				body: JSON.stringify(data),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Verify Billing Info CVV')
		return (await response.json()) as RecurlyTransaction
	}
}
