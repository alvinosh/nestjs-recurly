import { RecurlyConfigDto } from '../../../../../config/config.dto'
import { ConfigValidationModule } from '../../../../../config/config.module'
import { BillingInfoService } from './info.service'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [BillingInfoService],
	exports: [BillingInfoService],
})
export class BillingInfoModule {}
