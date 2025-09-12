import { RecurlyAPIConnection } from '@/v3/v3.types'
import { checkResponseIsOk, getBaseUrl, getHeaders } from '../../v3.helpers'
import { RecurlyCreateExternalAccountDto, RecurlyUpdateExternalAccountDto } from './externalAccount.dtos'
import { RecurlyExternalAccount, RecurlyExternalAccountListResponse } from './externalAccount.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ExternalAccountService {
	private readonly logger = new Logger(ExternalAccountService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listAccountExternalAccounts(accountId: string, config: RecurlyAPIConnection): Promise<RecurlyExternalAccountListResponse> {
		const url = `${getBaseUrl(this.config, config.location)}/accounts/${accountId}/external_accounts`

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Account External Accounts')
		return (await response.json()) as RecurlyExternalAccountListResponse
	}

	async getAccountExternalAccount(
		accountId: string,
		externalAccountId: string,
		config: RecurlyAPIConnection,
	): Promise<RecurlyExternalAccount> {
		const response = await fetch(
			`${getBaseUrl(this.config, config.location)}/accounts/${accountId}/external_accounts/${externalAccountId}`,
			{
				method: 'GET',
				headers: getHeaders(this.config, config.key),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Get Account External Account')
		return (await response.json()) as RecurlyExternalAccount
	}

	async createAccountExternalAccount(
		accountId: string,
		data: RecurlyCreateExternalAccountDto,
		config: RecurlyAPIConnection
	): Promise<RecurlyExternalAccount> {
		const response = await fetch(`${getBaseUrl(this.config, config.location)}/accounts/${accountId}/external_accounts`, {
			method: 'POST',
			headers: getHeaders(this.config, config.key),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create Account External Account')
		return (await response.json()) as RecurlyExternalAccount
	}

	async updateAccountExternalAccount(
		accountId: string,
		externalAccountId: string,
		data: RecurlyUpdateExternalAccountDto,
		config: RecurlyAPIConnection
	): Promise<RecurlyExternalAccount> {
		const response = await fetch(
			`${getBaseUrl(this.config, config.location)}/accounts/${accountId}/external_accounts/${externalAccountId}`,
			{
				method: 'PUT',
				headers: getHeaders(this.config, config.key),
				body: JSON.stringify(data),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Update Account External Account')
		return (await response.json()) as RecurlyExternalAccount
	}

	async deleteAccountExternalAccount(
		accountId: string,
		externalAccountId: string,
		config: RecurlyAPIConnection
	): Promise<RecurlyExternalAccount> {
		const response = await fetch(
			`${getBaseUrl(this.config, config.location)}/accounts/${accountId}/external_accounts/${externalAccountId}`,
			{
				method: 'DELETE',
				headers: getHeaders(this.config, config.key),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Delete Account External Account')
		return (await response.json()) as RecurlyExternalAccount
	}
}
