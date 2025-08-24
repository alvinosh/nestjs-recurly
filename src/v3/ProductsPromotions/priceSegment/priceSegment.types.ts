// Price Segment Types based on Recurly API v2021-02-25

/**
 * Represents a Price Segment object from Recurly
 */
export interface RecurlyPriceSegment {
	/**
	 * Object type - will always be 'price_segment'
	 */
	object?: string

	/**
	 * The price segment ID, e.g. `e28zov4fw0v2`
	 */
	id?: string

	/**
	 * The price segment code, e.g. `my-price-segment`
	 */
	code?: string
}

/**
 * Represents a list of Price Segments from Recurly
 */
export interface RecurlyPriceSegmentList {
	/**
	 * Object type - will always be 'list'
	 */
	object?: string

	/**
	 * Indicates there are more results on subsequent pages
	 */
	has_more?: boolean

	/**
	 * Path to subsequent page of results
	 */
	next?: string

	/**
	 * Array of Price Segment objects
	 */
	data?: RecurlyPriceSegment[]
}

/**
 * The price segment ID, e.g. `e28zov4fw0v2`
 */
export type RecurlyPriceSegmentId = string

/**
 * The price segment code, e.g. `my-price-segment`
 */
export type RecurlyPriceSegmentCode = string

/**
 * The price segment ID or code. For ID no prefix is used e.g. `e28zov4fw0v2`.
 * For requests, the code can also be used. Use prefix `code-`, e.g. `code-gold`.
 */
export type RecurlyPriceSegmentIdOrCode = string
