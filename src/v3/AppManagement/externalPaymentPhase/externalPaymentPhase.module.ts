import { ExternalPaymentPhaseService } from './externalPaymentPhase.service'
import { RecurlyConfigDto } from '@config/config.dto'
import { ConfigValidationModule } from '@config/config.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	controllers: [],
	providers: [ExternalPaymentPhaseService],
	exports: [ExternalPaymentPhaseService],
})
export class ExternalPaymentPhaseModule {}
