import { RECURLY_API_BASE_URL } from '../../../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../../../v3.helpers'
import { RecurlyAccountAcquisitionUpdateDto, RecurlyListAccountAcquisitionQueryDto } from './acquisition.dto'
import { RecurlyAccountAcquisition, RecurlyAccountAcquisitionListResponse } from './acquisition.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class AccountAcquisitionService {
	private readonly logger = new Logger(AccountAcquisitionService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	/**
	 * List a site's account acquisition data
	 * See the [Pagination Guide](/developers/guides/pagination.html) to learn how to use pagination in the API and Client Libraries.
	 * @param params - Query parameters for filtering
	 * @param apiKey - Optional API key to use for this request
	 * @returns A list of the site's account acquisition data
	 */
	async listAccountAcquisition(
		params?: RecurlyListAccountAcquisitionQueryDto,
		apiKey?: string,
	): Promise<RecurlyAccountAcquisitionListResponse> {
		let url = `${RECURLY_API_BASE_URL}/acquisitions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Account Acquisition')
		return (await response.json()) as RecurlyAccountAcquisitionListResponse
	}

	/**
	 * Fetch an account's acquisition data
	 * @param accountId - Account ID or code. For ID no prefix is used e.g. `e28zov4fw0v2`. For code use prefix `code-`, e.g. `code-bob`.
	 * @param apiKey - Optional API key to use for this request
	 * @returns An account's acquisition data
	 */
	async getAccountAcquisition(accountId: string, apiKey?: string): Promise<RecurlyAccountAcquisition> {
		const url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/acquisition`

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get Account Acquisition')
		return (await response.json()) as RecurlyAccountAcquisition
	}

	/**
	 * Update an account's acquisition data
	 * @param accountId - Account ID or code. For ID no prefix is used e.g. `e28zov4fw0v2`. For code use prefix `code-`, e.g. `code-bob`.
	 * @param acquisitionData - The acquisition data to update
	 * @param apiKey - Optional API key to use for this request
	 * @returns An account's updated acquisition data
	 */
	async updateAccountAcquisition(
		accountId: string,
		acquisitionData: RecurlyAccountAcquisitionUpdateDto,
		apiKey?: string,
	): Promise<RecurlyAccountAcquisition> {
		const url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/acquisition`

		const response = await fetch(url, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(acquisitionData),
		})

		await checkResponseIsOk(response, this.logger, 'Update Account Acquisition')
		return (await response.json()) as RecurlyAccountAcquisition
	}

	/**
	 * Remove an account's acquisition data
	 * @param accountId - Account ID or code. For ID no prefix is used e.g. `e28zov4fw0v2`. For code use prefix `code-`, e.g. `code-bob`.
	 * @param apiKey - Optional API key to use for this request
	 * @returns void
	 */
	async removeAccountAcquisition(accountId: string, apiKey?: string): Promise<void> {
		const url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/acquisition`

		const response = await fetch(url, {
			method: 'DELETE',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Remove Account Acquisition')
	}
}
