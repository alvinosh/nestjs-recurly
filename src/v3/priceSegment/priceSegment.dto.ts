import { IsArray, IsOptional, IsString, IsNumber, IsEnum } from 'class-validator'

/**
 * Query parameters for listing price segments
 */
export class RecurlyListPriceSegmentsQueryDto {
	/**
	 * Filter results by their IDs. Up to 200 IDs can be passed at once using
	 * commas as separators, e.g. `ids=h1at4d57xlmy,gyqgg0d3v9n1,jrsm5b4yefg6`.
	 *
	 * **Important notes:**
	 *
	 * * The `ids` parameter cannot be used with any other ordering or filtering
	 *   parameters (`limit`, `order`, `sort`, `begin_time`, `end_time`, etc)
	 * * Invalid or unknown IDs will be ignored, so you should check that the
	 *   results correspond to your request.
	 * * Records are returned in an arbitrary order. Since results are all
	 *   returned at once you can sort the records yourself.
	 */
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	ids?: string[]

	/**
	 * Limit number of records 1-200.
	 */
	@IsOptional()
	@IsNumber()
	limit?: number

	/**
	 * Sort order.
	 */
	@IsOptional()
	@IsEnum(['asc', 'desc'])
	order?: 'asc' | 'desc'
}
