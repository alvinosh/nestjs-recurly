import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../../v3.helpers'
import { RecurlyListAccountNotesQueryDto } from './notes.dto'
import { RecurlyAccountNote, RecurlyAccountNoteListResponse } from './notes.types'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class AccountNotesService {
	private readonly logger = new Logger(AccountNotesService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	/**
	 * List an account's notes
	 * See the [Pagination Guide](/developers/guides/pagination.html) to learn how to use pagination in the API and Client Libraries.
	 * @param accountId - Account ID or code. For ID no prefix is used e.g. `e28zov4fw0v2`. For code use prefix `code-`, e.g. `code-bob`.
	 * @param params - Query parameters for filtering
	 * @param apiKey - Optional API key to use for this request
	 * @returns A list of an account's notes
	 */
	async listAccountNotes(
		accountId: string,
		params?: RecurlyListAccountNotesQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyAccountNoteListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/notes`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Account Notes')
		return (await response.json()) as RecurlyAccountNoteListResponse
	}

	/**
	 * Fetch an account note
	 * @param accountId - Account ID or code. For ID no prefix is used e.g. `e28zov4fw0v2`. For code use prefix `code-`, e.g. `code-bob`.
	 * @param accountNoteId - Account Note ID
	 * @param apiKey - Optional API key to use for this request
	 * @returns An account note
	 */
	async getAccountNote(
		accountId: string,
		accountNoteId: string,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyAccountNote> {
		const url = `${getBaseUrl(this.config, config?.location)}/accounts/${accountId}/notes/${accountNoteId}`

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Get Account Note')
		return (await response.json()) as RecurlyAccountNote
	}
}
