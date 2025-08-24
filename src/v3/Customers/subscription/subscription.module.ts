import { ChangeModule } from './change/change.module'
import { SubscriptionService } from './subscription.service'
import { RecurlyConfigDto } from '@config/config.dto'
import { ConfigValidationModule } from '@config/config.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto), ChangeModule],
	providers: [SubscriptionService],
	exports: [SubscriptionService, ChangeModule],
})
export class SubscriptionModule {}
