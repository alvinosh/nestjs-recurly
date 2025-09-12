import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../v3.helpers'
import { RecurlyListExternalInvoicesQueryDto, RecurlyCreateExternalInvoiceDto } from './externalInvoices.dtos'
import { RecurlyExternalInvoice, RecurlyExternalInvoiceListResponse } from './externalInvoices.types'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ExternalInvoicesService {
	private readonly logger = new Logger(ExternalInvoicesService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listExternalInvoices(
		params?: RecurlyListExternalInvoicesQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyExternalInvoiceListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/external_invoices`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List External Invoices')
		return (await response.json()) as RecurlyExternalInvoiceListResponse
	}

	async getExternalInvoice(
		externalInvoiceId: string,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyExternalInvoice> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/external_invoices/${externalInvoiceId}`,
			{
				method: 'GET',
				headers: getHeaders(this.config, config?.key),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Get External Invoice')
		return (await response.json()) as RecurlyExternalInvoice
	}

	async listAccountExternalInvoices(
		accountId: string,
		params?: RecurlyListExternalInvoicesQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyExternalInvoiceListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/external_invoices`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Account External Invoices')
		return (await response.json()) as RecurlyExternalInvoiceListResponse
	}

	async listExternalSubscriptionExternalInvoices(
		externalSubscriptionId: string,
		params?: RecurlyListExternalInvoicesQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyExternalInvoiceListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/external_subscriptions/${externalSubscriptionId}/external_invoices`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List External Subscription External Invoices')
		return (await response.json()) as RecurlyExternalInvoiceListResponse
	}

	async createExternalInvoice(
		externalSubscriptionId: string,
		data: RecurlyCreateExternalInvoiceDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyExternalInvoice> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/external_subscriptions/${externalSubscriptionId}/external_invoices`,
			{
				method: 'POST',
				headers: getHeaders(this.config, config?.key),
				body: JSON.stringify(data),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Create External Invoice')
		return (await response.json()) as RecurlyExternalInvoice
	}
}
