import { ExternalSubscriptionService } from './externalSubscription.service'
import { RecurlyConfigDto } from '@config/config.dto'
import { ConfigValidationModule } from '@config/config.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	controllers: [],
	providers: [ExternalSubscriptionService],
	exports: [ExternalSubscriptionService],
})
export class ExternalSubscriptionModule {}
