import { RecurlyConfigDto } from '../config/config.dto'
import { ConfigValidationModule } from '../config/config.module'
import { AccountsModule } from './accounts/accounts.module'
import { CouponModule } from './coupon/coupon.module'
import { ItemModule } from './item/item.module'
import { MeasuredUnitModule } from './measuredUnit/measuredUnit.module'
import { PlanModule } from './plan/plan.module'
import { PriceSegmentModule } from './priceSegment/priceSegment.module'
import { SubscriptionModule } from './subscription/subscription.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [
		ConfigValidationModule.register(RecurlyConfigDto),
		AccountsModule,
		ItemModule,
		PlanModule,
		MeasuredUnitModule,
		CouponModule,
		PriceSegmentModule,
		SubscriptionModule,
	],
	exports: [
		AccountsModule,
		ItemModule,
		PlanModule,
		MeasuredUnitModule,
		CouponModule,
		PriceSegmentModule,
		SubscriptionModule,
	],
})
export class RecurlyV3Module {}
