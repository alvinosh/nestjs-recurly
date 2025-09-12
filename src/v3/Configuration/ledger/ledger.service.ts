import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../v3.helpers'
import {
	RecurlyListGeneralLedgerAccountsQueryDto,
	RecurlyCreateGeneralLedgerAccountDto,
	RecurlyUpdateGeneralLedgerAccountDto,
} from './ledger.dtos'
import { RecurlyGeneralLedgerAccount, RecurlyGeneralLedgerAccountListResponse } from './ledger.types'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class LedgerService {
	private readonly logger = new Logger(LedgerService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async createGeneralLedgerAccount(
		data: RecurlyCreateGeneralLedgerAccountDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyGeneralLedgerAccount> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/general_ledger_accounts`, {
			method: 'POST',
			headers: getHeaders(this.config, config?.key),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create General Ledger Account')
		return (await response.json()) as RecurlyGeneralLedgerAccount
	}

	async listGeneralLedgerAccounts(
		params?: RecurlyListGeneralLedgerAccountsQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyGeneralLedgerAccountListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/general_ledger_accounts`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List General Ledger Accounts')
		return (await response.json()) as RecurlyGeneralLedgerAccountListResponse
	}

	async getGeneralLedgerAccount(
		generalLedgerAccountId: string,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyGeneralLedgerAccount> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/general_ledger_accounts/${generalLedgerAccountId}`,
			{
				method: 'GET',
				headers: getHeaders(this.config, config?.key),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Get General Ledger Account')
		return (await response.json()) as RecurlyGeneralLedgerAccount
	}

	async updateGeneralLedgerAccount(
		generalLedgerAccountId: string,
		data: RecurlyUpdateGeneralLedgerAccountDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyGeneralLedgerAccount> {
		const response = await fetch(
			`${getBaseUrl(this.config, config?.location)}/general_ledger_accounts/${generalLedgerAccountId}`,
			{
				method: 'PUT',
				headers: getHeaders(this.config, config?.key),
				body: JSON.stringify(data),
			},
		)

		await checkResponseIsOk(response, this.logger, 'Update General Ledger Account')
		return (await response.json()) as RecurlyGeneralLedgerAccount
	}
}
