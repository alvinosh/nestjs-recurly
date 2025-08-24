import { RECURLY_API_BASE_URL } from '../../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../../v3.helpers'
import { RecurlyListSitesQueryDto } from './site.dtos'
import { RecurlySite, RecurlySiteListResponse } from './site.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class SiteService {
	private readonly logger = new Logger(SiteService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listSites(params?: RecurlyListSitesQueryDto, apiKey?: string): Promise<RecurlySiteListResponse> {
		let url = `${RECURLY_API_BASE_URL}/sites`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Sites')
		return (await response.json()) as RecurlySiteListResponse
	}

	async getSite(siteId: string, apiKey?: string): Promise<RecurlySite> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/sites/${siteId}`, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get Site')
		return (await response.json()) as RecurlySite
	}
}
