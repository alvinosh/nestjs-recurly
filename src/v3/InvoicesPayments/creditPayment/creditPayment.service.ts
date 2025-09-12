import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../v3.helpers'
import { RecurlyListCreditPaymentsQueryDto, RecurlyListAccountCreditPaymentsQueryDto } from './creditPayment.dto'
import { RecurlyCreditPayment, RecurlyCreditPaymentListResponse } from './creditPayment.types'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
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
		config?: RecurlyAPIConnection,
	): Promise<RecurlyCreditPaymentListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/credit_payments`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
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
	async getCreditPayment(creditPaymentId: string, config?: RecurlyAPIConnection): Promise<RecurlyCreditPayment> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/credit_payments/${creditPaymentId}`,
			{
				method: 'GET',
				headers: getHeaders(this.config, config?.key),
			},
		)

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
		config?: RecurlyAPIConnection,
	): Promise<RecurlyCreditPaymentListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/credit_payments`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Account Credit Payments')
		return (await response.json()) as RecurlyCreditPaymentListResponse
	}
}
