import { RECURLY_API_BASE_URL } from '../../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../../v3.helpers'
import { RecurlyListExternalInvoicesQueryDto, RecurlyCreateExternalInvoiceDto } from './externalInvoices.dtos'
import { RecurlyExternalInvoice, RecurlyExternalInvoiceListResponse } from './externalInvoices.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ExternalInvoicesService {
	private readonly logger = new Logger(ExternalInvoicesService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listExternalInvoices(
		params?: RecurlyListExternalInvoicesQueryDto,
		apiKey?: string,
	): Promise<RecurlyExternalInvoiceListResponse> {
		let url = `${RECURLY_API_BASE_URL}/external_invoices`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List External Invoices')
		return (await response.json()) as RecurlyExternalInvoiceListResponse
	}

	async getExternalInvoice(externalInvoiceId: string, apiKey?: string): Promise<RecurlyExternalInvoice> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/external_invoices/${externalInvoiceId}`, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get External Invoice')
		return (await response.json()) as RecurlyExternalInvoice
	}

	async listAccountExternalInvoices(
		accountId: string,
		params?: RecurlyListExternalInvoicesQueryDto,
		apiKey?: string,
	): Promise<RecurlyExternalInvoiceListResponse> {
		let url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/external_invoices`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Account External Invoices')
		return (await response.json()) as RecurlyExternalInvoiceListResponse
	}

	async listExternalSubscriptionExternalInvoices(
		externalSubscriptionId: string,
		params?: RecurlyListExternalInvoicesQueryDto,
		apiKey?: string,
	): Promise<RecurlyExternalInvoiceListResponse> {
		let url = `${RECURLY_API_BASE_URL}/external_subscriptions/${externalSubscriptionId}/external_invoices`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List External Subscription External Invoices')
		return (await response.json()) as RecurlyExternalInvoiceListResponse
	}

	async createExternalInvoice(
		externalSubscriptionId: string,
		data: RecurlyCreateExternalInvoiceDto,
		apiKey?: string,
	): Promise<RecurlyExternalInvoice> {
		const response = await fetch(
			`${RECURLY_API_BASE_URL}/external_subscriptions/${externalSubscriptionId}/external_invoices`,
			{
				method: 'POST',
				headers: getHeaders(this.config, apiKey),
				body: JSON.stringify(data),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Create External Invoice')
		return (await response.json()) as RecurlyExternalInvoice
	}
}
