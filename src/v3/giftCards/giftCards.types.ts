import { RecurlyAddressWithName } from '../v3.types'

// Enums
export type RecurlyGiftCardDeliveryMethod = 'email' | 'post'

// Gift Card Delivery interface
export interface RecurlyGiftCardDelivery {
	method?: RecurlyGiftCardDeliveryMethod
	email_address?: string
	deliver_at?: string | null
	first_name?: string
	last_name?: string
	recipient_address?: RecurlyAddressWithName
	gifter_name?: string
	personal_message?: string
}

// Main Gift Card interface
export interface RecurlyGiftCard {
	id?: string
	object?: string
	gifter_account_id?: string
	recipient_account_id?: string
	purchase_invoice_id?: string
	redemption_invoice_id?: string
	redemption_code?: string
	balance?: number
	product_code?: string
	unit_amount?: number
	currency?: string
	delivery?: RecurlyGiftCardDelivery
	performance_obligation_id?: string
	liability_gl_account_id?: string
	revenue_gl_account_id?: string
	created_at?: string
	updated_at?: string
	delivered_at?: string | null
	redeemed_at?: string | null
	canceled_at?: string | null
}

// Gift Card List Response interface
export interface RecurlyGiftCardListResponse {
	object: string
	has_more: boolean
	next?: string
	data: RecurlyGiftCard[]
}

// Account Purchase interface (for gifter account)
export interface RecurlyAccountPurchase {
	id?: string
	code?: string
	acquisition?: {
		cost?: {
			currency?: string
			amount?: number
		}
		channel?: string
		subchannel?: string
		campaign?: string
	}
}

// Account Reference interface (for recipient account)
export interface RecurlyAccountReference {
	id?: string
	code?: string
}
