import { PurchaseService } from './purchase.service'
import { RecurlyConfigDto } from '@config/config.dto'
import { ConfigValidationModule } from '@config/config.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [PurchaseService],
	exports: [PurchaseService],
})
export class PurchaseModule {}
