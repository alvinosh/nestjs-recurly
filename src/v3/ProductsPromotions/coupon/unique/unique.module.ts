import { UniqueCouponCodeService } from './unique.service'
import { RecurlyConfigDto } from '@config/config.dto'
import { ConfigValidationModule } from '@config/config.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [UniqueCouponCodeService],
	exports: [UniqueCouponCodeService],
})
export class UniqueCouponCodeModule {}
