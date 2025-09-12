import { buildQueryString, checkResponseIsOk, getBaseUrl, getHeaders } from '../../v3.helpers'
import { RecurlyListPriceSegmentsQueryDto } from './priceSegment.dto'
import { RecurlyPriceSegment, RecurlyPriceSegmentList } from './priceSegment.types'
import { RecurlyAPIConnection } from '@/v3/v3.types'
import { RecurlyConfigDto } from '@config/config.dto'
import { InjectConfig } from '@config/config.provider'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class PriceSegmentService {
	private readonly logger = new Logger(PriceSegmentService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	/**
	 * List a site's price segments
	 * @param params Query parameters for filtering and pagination
	 * @param apiKey Optional API key to override the default configuration
	 * @returns A list of price segments
	 */
	async listPriceSegments(
		params?: RecurlyListPriceSegmentsQueryDto,
		config?: RecurlyAPIConnection,
	): Promise<RecurlyPriceSegmentList> {
		let url = `${getBaseUrl(this.config, config?.location)}/price_segments`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'List Price Segments')
		return (await response.json()) as RecurlyPriceSegmentList
	}

	/**
	 * Fetch a price segment
	 * @param priceSegmentId The price segment ID or code. For ID no prefix is used e.g. `e28zov4fw0v2`.
	 *                       For code, use prefix `code-`, e.g. `code-gold`.
	 * @param apiKey Optional API key to override the default configuration
	 * @returns A price segment
	 */
	async getPriceSegment(priceSegmentId: string, config?: RecurlyAPIConnection): Promise<RecurlyPriceSegment> {
		const response = await fetch(`${getBaseUrl(this.config, config?.location)}/price_segments/${priceSegmentId}`, {
			method: 'GET',
			headers: getHeaders(this.config, config?.key),
		})

		await checkResponseIsOk(response, this.logger, 'Get Price Segment')
		return (await response.json()) as RecurlyPriceSegment
	}
}
