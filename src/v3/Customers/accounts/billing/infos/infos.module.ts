import { RecurlyConfigDto } from '../../../../../config/config.dto'
import { ConfigValidationModule } from '../../../../../config/config.module'
import { BillingInfosService } from './infos.service'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [BillingInfosService],
	exports: [BillingInfosService],
})
export class BillingInfosModule {}
