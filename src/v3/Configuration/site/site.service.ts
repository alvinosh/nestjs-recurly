import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../v3.helpers'
import { RecurlyListSitesQueryDto } from './site.dtos'
import { RecurlySite, RecurlySiteListResponse } from './site.types'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class SiteService {
	private readonly logger = new Logger(SiteService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listSites(
		params?: RecurlyListSitesQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlySiteListResponse> {
		let url = `${getBaseUrl(this.config, config?.location)}/sites`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Sites')
		return (await response.json()) as RecurlySiteListResponse
	}

	async getSite(siteId: string, config?: RecurlyAPIConnection): Promise<RecurlySite> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/sites/${siteId}`, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Get Site')
		return (await response.json()) as RecurlySite
	}
}
