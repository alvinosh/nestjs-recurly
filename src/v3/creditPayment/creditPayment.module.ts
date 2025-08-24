import { RecurlyConfigDto } from '../../config/config.dto'
import { ConfigValidationModule } from '../../config/config.module'
import { CreditPaymentService } from './creditPayment.service'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [CreditPaymentService],
	exports: [CreditPaymentService],
})
export class CreditPaymentModule {}
