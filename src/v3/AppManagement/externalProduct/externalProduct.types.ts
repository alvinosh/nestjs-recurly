import { RecurlyPlanMini } from '@/v3/ProductsPromotions/plan/plan.types'

// External Product Reference Connection Type
export type RecurlyExternalProductReferenceConnectionType = string

// External Product Reference Mini interface
export interface RecurlyExternalProductReferenceMini {
	id?: string
	object?: string
	reference_code?: string
	external_connection_type?: RecurlyExternalProductReferenceConnectionType
}

// External Product Reference Base interface
export interface RecurlyExternalProductReferenceBase {
	reference_code?: string
	external_connection_type?: RecurlyExternalProductReferenceConnectionType
}

// Main External Product interface
export interface RecurlyExternalProduct {
	id?: string
	object?: string
	name?: string
	plan?: RecurlyPlanMini
	created_at?: string
	updated_at?: string
	external_product_references?: RecurlyExternalProductReferenceMini[]
}

// External Product List Response
export interface RecurlyExternalProductListResponse {
	object?: string
	has_more?: boolean
	next?: string
	data?: RecurlyExternalProduct[]
}

// External Product Reference Collection Response
export interface RecurlyExternalProductReferenceCollectionResponse {
	object?: string
	has_more?: boolean
	next?: string
	data?: RecurlyExternalProductReferenceMini[]
}
