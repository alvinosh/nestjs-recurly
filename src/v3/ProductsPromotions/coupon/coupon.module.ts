import { RecurlyConfigDto } from '../../../config/config.dto'
import { ConfigValidationModule } from '../../../config/config.module'
import { CouponService } from './coupon.service'
import { UniqueCouponCodeModule } from './unique/unique.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto), UniqueCouponCodeModule],
	providers: [CouponService],
	exports: [CouponService, UniqueCouponCodeModule],
})
export class CouponModule {}
