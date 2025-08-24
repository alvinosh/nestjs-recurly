import { RecurlyBillingInfo } from '../info/info.types'

export interface RecurlyBillingInfoListResponse {
	object?: string
	has_more?: boolean
	next?: string
	data?: RecurlyBillingInfo[]
}
