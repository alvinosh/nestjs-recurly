import { RecurlyTransaction } from '../../../../InvoicesPayments/transaction/transaction.types'
import { RECURLY_API_BASE_URL } from '../../../../v3.constants'
import { checkResponseIsOk, getHeaders } from '../../../../v3.helpers'
import { RecurlyUpdateBillingInfoDto, RecurlyVerifyBillingInfoDto, RecurlyVerifyBillingInfoCvvDto } from './info.dto'
import { RecurlyBillingInfo } from './info.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class BillingInfoService {
	private readonly logger = new Logger(BillingInfoService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	/**
	 * Fetch an account's billing information
	 * @param accountId Account ID or code (for code use prefix `code-`)
	 * @param apiKey Optional API key to override the default
	 * @returns The account's billing information
	 */
	async getBillingInfo(accountId: string, apiKey?: string): Promise<RecurlyBillingInfo> {
		const url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/billing_info`
		const headers = getHeaders(this.config, apiKey)

		const response = await fetch(url, {
			method: 'GET',
			headers,
		})

		await checkResponseIsOk(response, this.logger, 'Get billing info')

		const data = (await response.json()) as RecurlyBillingInfo
		return data
	}

	/**
	 * Set an account's billing information
	 * @param accountId Account ID or code (for code use prefix `code-`)
	 * @param billingInfo Billing information to update
	 * @param apiKey Optional API key to override the default
	 * @returns Updated billing information
	 */
	async updateBillingInfo(
		accountId: string,
		billingInfo: RecurlyUpdateBillingInfoDto,
		apiKey?: string,
	): Promise<RecurlyBillingInfo> {
		const url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/billing_info`
		const headers = getHeaders(this.config, apiKey)

		const response = await fetch(url, {
			method: 'PUT',
			headers,
			body: JSON.stringify(billingInfo),
		})

		await checkResponseIsOk(response, this.logger, 'Update billing info')

		const data = (await response.json()) as RecurlyBillingInfo
		return data
	}

	/**
	 * Remove an account's billing information
	 * @param accountId Account ID or code (for code use prefix `code-`)
	 * @param apiKey Optional API key to override the default
	 */
	async removeBillingInfo(accountId: string, apiKey?: string): Promise<void> {
		const url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/billing_info`
		const headers = getHeaders(this.config, apiKey)

		const response = await fetch(url, {
			method: 'DELETE',
			headers,
		})

		await checkResponseIsOk(response, this.logger, 'Remove billing info')
	}

	/**
	 * Verify an account's credit card billing information
	 * @param accountId Account ID or code (for code use prefix `code-`)
	 * @param verifyData Verification data
	 * @param apiKey Optional API key to override the default
	 * @returns Transaction information from verification
	 */
	async verifyBillingInfo(
		accountId: string,
		verifyData?: RecurlyVerifyBillingInfoDto,
		apiKey?: string,
	): Promise<RecurlyTransaction> {
		const url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/billing_info/verify`
		const headers = getHeaders(this.config, apiKey)

		const response = await fetch(url, {
			method: 'POST',
			headers,
			body: JSON.stringify(verifyData || {}),
		})

		await checkResponseIsOk(response, this.logger, 'Verify billing info')

		const data = (await response.json()) as RecurlyTransaction
		return data
	}

	/**
	 * Verify an account's credit card billing CVV
	 * @param accountId Account ID or code (for code use prefix `code-`)
	 * @param verifyData CVV verification data
	 * @param apiKey Optional API key to override the default
	 * @returns Transaction information from verification
	 */
	async verifyBillingInfoCvv(
		accountId: string,
		verifyData: RecurlyVerifyBillingInfoCvvDto,
		apiKey?: string,
	): Promise<RecurlyTransaction> {
		const url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/billing_info/verify_cvv`
		const headers = getHeaders(this.config, apiKey)

		const response = await fetch(url, {
			method: 'POST',
			headers,
			body: JSON.stringify(verifyData),
		})

		await checkResponseIsOk(response, this.logger, 'Verify billing info CVV')

		const data = (await response.json()) as RecurlyTransaction
		return data
	}
}
