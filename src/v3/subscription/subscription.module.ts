import { Module } from '@nestjs/common'
import { ConfigValidationModule } from '../../config/config.module'
import { RecurlyConfigDto } from '../../config/config.dto'
import { SubscriptionService } from './subscription.service'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [SubscriptionService],
	exports: [SubscriptionService],
})
export class SubscriptionModule {}
