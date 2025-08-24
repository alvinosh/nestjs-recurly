import { BillingInfoService } from './info.service'
import { RecurlyConfigDto } from '@config/config.dto'
import { ConfigValidationModule } from '@config/config.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [BillingInfoService],
	exports: [BillingInfoService],
})
export class BillingInfoModule {}
