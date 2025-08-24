import { BillingInfosService } from './infos.service'
import { RecurlyConfigDto } from '@config/config.dto'
import { ConfigValidationModule } from '@config/config.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [BillingInfosService],
	exports: [BillingInfosService],
})
export class BillingInfosModule {}
