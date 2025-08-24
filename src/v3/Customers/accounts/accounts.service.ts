import { RecurlyConfigDto } from '../../../config/config.dto'
import { InjectConfig } from '../../../config/config.provider'
import { RECURLY_API_BASE_URL } from '../../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../../v3.helpers'
import {
	RecurlyListAccountsQueryDto,
	RecurlyCreateAccountDto,
	RecurlyUpdateAccountDto,
	RecurlyListChildAccountsQueryDto,
	RecurlyListExternalSubscriptionsQueryDto,
} from './accounts.dto'
import {
	RecurlyAccount,
	RecurlyAccountListResponse,
	RecurlyAccountBalance,
	RecurlyExternalSubscriptionListResponse,
} from './accounts.types'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class AccountsService {
	private readonly logger = new Logger(AccountsService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listAccounts(params?: RecurlyListAccountsQueryDto, apiKey?: string): Promise<RecurlyAccountListResponse> {
		let url = `${RECURLY_API_BASE_URL}/accounts`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Accounts')
		return (await response.json()) as RecurlyAccountListResponse
	}

	async createAccount(data: RecurlyCreateAccountDto, apiKey?: string): Promise<RecurlyAccount> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/accounts`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create Account')

		return (await response.json()) as RecurlyAccount
	}

	async getAccount(accountId: string, apiKey?: string): Promise<RecurlyAccount> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/accounts/${accountId}`, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get Account')

		return (await response.json()) as RecurlyAccount
	}

	async updateAccount(accountId: string, data: RecurlyUpdateAccountDto, apiKey?: string): Promise<RecurlyAccount> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/accounts/${accountId}`, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Update Account')
		return (await response.json()) as RecurlyAccount
	}

	async deactivateAccount(accountId: string, apiKey?: string): Promise<RecurlyAccount> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/accounts/${accountId}`, {
			method: 'DELETE',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Deactivate Account')
		return (await response.json()) as RecurlyAccount
	}

	async reactivateAccount(accountId: string, apiKey?: string): Promise<RecurlyAccount> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/accounts/${accountId}/reactivate`, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Reactivate Account')
		return (await response.json()) as RecurlyAccount
	}

	async getAccountBalance(accountId: string, apiKey?: string): Promise<RecurlyAccountBalance> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/accounts/${accountId}/balance`, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get Account Balance')
		return (await response.json()) as RecurlyAccountBalance
	}

	async listChildAccounts(
		accountId: string,
		params?: RecurlyListChildAccountsQueryDto,
		apiKey?: string,
	): Promise<RecurlyAccountListResponse> {
		let url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/accounts`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Child Accounts')
		return (await response.json()) as RecurlyAccountListResponse
	}

	async listAccountExternalSubscriptions(
		accountId: string,
		params?: RecurlyListExternalSubscriptionsQueryDto,
		apiKey?: string,
	): Promise<RecurlyExternalSubscriptionListResponse> {
		let url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/external_subscriptions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Account External Subscriptions')
		return (await response.json()) as RecurlyExternalSubscriptionListResponse
	}
}
