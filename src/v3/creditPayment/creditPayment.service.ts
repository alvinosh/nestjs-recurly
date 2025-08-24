import { RecurlyConfigDto } from '../../config/config.dto'
import { InjectConfig } from '../../config/config.provider'
import { RECURLY_API_BASE_URL } from '../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../v3.helpers'
import { RecurlyListCreditPaymentsQueryDto, RecurlyListAccountCreditPaymentsQueryDto } from './creditPayment.dto'
import { RecurlyCreditPayment, RecurlyCreditPaymentListResponse } from './creditPayment.types'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class CreditPaymentService {
	private readonly logger = new Logger(CreditPaymentService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	/**
	 * List a site's credit payments
	 * @param params Query parameters for filtering and pagination
	 * @param apiKey Optional API key to use instead of the default one
	 * @returns Promise resolving to a paginated list of credit payments
	 */
	async listCreditPayments(
		params?: RecurlyListCreditPaymentsQueryDto,
		apiKey?: string,
	): Promise<RecurlyCreditPaymentListResponse> {
		let url = `${RECURLY_API_BASE_URL}/credit_payments`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Credit Payments')
		return (await response.json()) as RecurlyCreditPaymentListResponse
	}

	/**
	 * Fetch a credit payment
	 * @param creditPaymentId Credit Payment ID or UUID
	 * @param apiKey Optional API key to use instead of the default one
	 * @returns Promise resolving to a credit payment object
	 */
	async getCreditPayment(creditPaymentId: string, apiKey?: string): Promise<RecurlyCreditPayment> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/credit_payments/${creditPaymentId}`, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get Credit Payment')
		return (await response.json()) as RecurlyCreditPayment
	}

	/**
	 * List an account's credit payments
	 * @param accountId Account ID or code
	 * @param params Query parameters for filtering and pagination
	 * @param apiKey Optional API key to use instead of the default one
	 * @returns Promise resolving to a paginated list of credit payments for the account
	 */
	async listAccountCreditPayments(
		accountId: string,
		params?: RecurlyListAccountCreditPaymentsQueryDto,
		apiKey?: string,
	): Promise<RecurlyCreditPaymentListResponse> {
		let url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/credit_payments`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Account Credit Payments')
		return (await response.json()) as RecurlyCreditPaymentListResponse
	}
}
