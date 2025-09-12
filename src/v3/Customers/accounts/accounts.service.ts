import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../v3.helpers'
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
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class AccountsService {
	private readonly logger = new Logger(AccountsService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listAccounts(
		params?: RecurlyListAccountsQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyAccountListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/accounts`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Accounts')
		return (await response.json()) as RecurlyAccountListResponse
	}

	async createAccount(data: RecurlyCreateAccountDto, config?: RecurlyAPIConnection): Promise<RecurlyAccount> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/accounts`, {
			method: 'POST',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create Account')

		return (await response.json()) as RecurlyAccount
	}

	async getAccount(accountId: string, config?: RecurlyAPIConnection): Promise<RecurlyAccount> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/accounts/${accountId}`, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Get Account')

		return (await response.json()) as RecurlyAccount
	}

	async updateAccount(
		accountId: string,
		data: RecurlyUpdateAccountDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyAccount> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/accounts/${accountId}`, {
			method: 'PUT',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Update Account')
		return (await response.json()) as RecurlyAccount
	}

	async deactivateAccount(accountId: string, config?: RecurlyAPIConnection): Promise<RecurlyAccount> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/accounts/${accountId}`, {
			method: 'DELETE',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Deactivate Account')
		return (await response.json()) as RecurlyAccount
	}

	async reactivateAccount(accountId: string, config?: RecurlyAPIConnection): Promise<RecurlyAccount> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/reactivate`, {
			method: 'PUT',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Reactivate Account')
		return (await response.json()) as RecurlyAccount
	}

	async getAccountBalance(accountId: string, config?: RecurlyAPIConnection): Promise<RecurlyAccountBalance> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/balance`, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Get Account Balance')
		return (await response.json()) as RecurlyAccountBalance
	}

	async listChildAccounts(
		accountId: string,
		params?: RecurlyListChildAccountsQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyAccountListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/accounts`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Child Accounts')
		return (await response.json()) as RecurlyAccountListResponse
	}

	async listAccountExternalSubscriptions(
		accountId: string,
		params?: RecurlyListExternalSubscriptionsQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyExternalSubscriptionListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/external_subscriptions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Account External Subscriptions')
		return (await response.json()) as RecurlyExternalSubscriptionListResponse
	}
}
