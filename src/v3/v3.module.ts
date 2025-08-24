import { RecurlyConfigDto } from '../config/config.dto'
import { ConfigValidationModule } from '../config/config.module'
import { AccountsModule } from './accounts/accounts.module'
import { CouponModule } from './coupon/coupon.module'
import { GiftCardModule } from './giftCards/giftCards.module'
import { InvoiceModule } from './invoice/invoice.module'
import { ItemModule } from './item/item.module'
import { LineItemModule } from './lineItem/lineItem.module'
import { MeasuredUnitModule } from './measuredUnit/measuredUnit.module'
import { PlanModule } from './plan/plan.module'
import { PriceSegmentModule } from './priceSegment/priceSegment.module'
import { PurchaseModule } from './purchase/purchase.module'
import { SubscriptionModule } from './subscription/subscription.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [
		ConfigValidationModule.register(RecurlyConfigDto),
		AccountsModule,
		ItemModule,
		PlanModule,
		LineItemModule,
		MeasuredUnitModule,
		CouponModule,
		GiftCardModule,
		InvoiceModule,
		PriceSegmentModule,
		PurchaseModule,
		SubscriptionModule,
	],
	exports: [
		AccountsModule,
		ItemModule,
		PlanModule,
		LineItemModule,
		MeasuredUnitModule,
		CouponModule,
		GiftCardModule,
		InvoiceModule,
		PriceSegmentModule,
		PurchaseModule,
		SubscriptionModule,
	],
})
export class RecurlyV3Module {}
