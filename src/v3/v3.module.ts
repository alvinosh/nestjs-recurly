import { SiteModule } from './Configuration/site/site.module'
import { AccountsModule } from './Customers/accounts/accounts.module'
import { GiftCardModule } from './Customers/giftCards/giftCards.module'
import { PurchaseModule } from './Customers/purchase/purchase.module'
import { SubscriptionModule } from './Customers/subscription/subscription.module'
import { CreditPaymentModule } from './InvoicesPayments/creditPayment/creditPayment.module'
import { InvoiceModule } from './InvoicesPayments/invoice/invoice.module'
import { LineItemModule } from './InvoicesPayments/lineItem/lineItem.module'
import { TransactionModule } from './InvoicesPayments/transaction/transaction.module'
import { CouponModule } from './ProductsPromotions/coupon/coupon.module'
import { ItemModule } from './ProductsPromotions/item/item.module'
import { MeasuredUnitModule } from './ProductsPromotions/measuredUnit/measuredUnit.module'
import { PlanModule } from './ProductsPromotions/plan/plan.module'
import { PriceSegmentModule } from './ProductsPromotions/priceSegment/priceSegment.module'
import { RecurlyConfigDto } from '@config/config.dto'
import { ConfigValidationModule } from '@config/config.module'
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
		CreditPaymentModule,
		GiftCardModule,
		InvoiceModule,
		PriceSegmentModule,
		PurchaseModule,
		SubscriptionModule,
		TransactionModule,
		SiteModule,
	],
	exports: [
		AccountsModule,
		ItemModule,
		PlanModule,
		LineItemModule,
		MeasuredUnitModule,
		CouponModule,
		CreditPaymentModule,
		GiftCardModule,
		InvoiceModule,
		PriceSegmentModule,
		PurchaseModule,
		SubscriptionModule,
		TransactionModule,
		SiteModule,
	],
})
export class RecurlyV3Module {}
