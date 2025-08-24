import { AccountsService } from './accounts.service'
import { AccountAcquisitionModule } from './acquisition/acquisition.module'
import { BillingInfoModule } from './billing/info/info.module'
import { BillingInfosModule } from './billing/infos/infos.module'
import { CouponRedemptionModule } from './couponRedemption/couponRedemption.module'
import { AccountNotesModule } from './notes/notes.module'
import { ShippingAddressModule } from './shippingAddress/shippingAddress.module'
import { RecurlyConfigDto } from '@config/config.dto'
import { ConfigValidationModule } from '@config/config.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [
		ConfigValidationModule.register(RecurlyConfigDto),
		AccountNotesModule,
		AccountAcquisitionModule,
		BillingInfoModule,
		BillingInfosModule,
		CouponRedemptionModule,
		ShippingAddressModule,
	],
	controllers: [],
	providers: [AccountsService],
	exports: [
		AccountsService,
		AccountNotesModule,
		AccountAcquisitionModule,
		BillingInfoModule,
		BillingInfosModule,
		CouponRedemptionModule,
		ShippingAddressModule,
	],
})
export class AccountsModule {}
