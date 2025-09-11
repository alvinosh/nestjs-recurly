import { RecurlyAPILocation } from '@/v3/v3.types'
import { RECURLY_API_BASE_URL } from '../../v3.constants'
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

	async listAccountExternalAccounts(accountId: string, apiKey?: string, apiLocation?: RecurlyAPILocation): Promise<RecurlyExternalAccountListResponse> {
		const url = `${getBaseUrl(this.config, apiLocation)}/accounts/${accountId}/external_accounts`

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Account External Accounts')
		return (await response.json()) as RecurlyExternalAccountListResponse
	}

	async getAccountExternalAccount(
		accountId: string,
		externalAccountId: string,
		apiKey?: string,
		apiLocation?: RecurlyAPILocation,
	): Promise<RecurlyExternalAccount> {
		const response = await fetch(
			`${getBaseUrl(this.config, apiLocation)}/accounts/${accountId}/external_accounts/${externalAccountId}`,
			{
				method: 'GET',
				headers: getHeaders(this.config, apiKey),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Get Account External Account')
		return (await response.json()) as RecurlyExternalAccount
	}

	async createAccountExternalAccount(
		accountId: string,
		data: RecurlyCreateExternalAccountDto,
		apiKey?: string,
		apiLocation?: RecurlyAPILocation,
	): Promise<RecurlyExternalAccount> {
		const response = await fetch(`${getBaseUrl(this.config, apiLocation)}/accounts/${accountId}/external_accounts`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create Account External Account')
		return (await response.json()) as RecurlyExternalAccount
	}

	async updateAccountExternalAccount(
		accountId: string,
		externalAccountId: string,
		data: RecurlyUpdateExternalAccountDto,
		apiKey?: string,
		apiLocation?: RecurlyAPILocation,
	): Promise<RecurlyExternalAccount> {
		const response = await fetch(
			`${getBaseUrl(this.config, apiLocation)}/accounts/${accountId}/external_accounts/${externalAccountId}`,
			{
				method: 'PUT',
				headers: getHeaders(this.config, apiKey),
				body: JSON.stringify(data),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Update Account External Account')
		return (await response.json()) as RecurlyExternalAccount
	}

	async deleteAccountExternalAccount(
		accountId: string,
		externalAccountId: string,
		apiKey?: string,
		apiLocation?: RecurlyAPILocation,
	): Promise<RecurlyExternalAccount> {
		const response = await fetch(
			`${getBaseUrl(this.config, apiLocation)}/accounts/${accountId}/external_accounts/${externalAccountId}`,
			{
				method: 'DELETE',
				headers: getHeaders(this.config, apiKey),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Delete Account External Account')
		return (await response.json()) as RecurlyExternalAccount
	}
}
