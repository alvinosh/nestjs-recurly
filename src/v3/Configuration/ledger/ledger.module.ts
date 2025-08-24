import { LedgerService } from './ledger.service'
import { RecurlyConfigDto } from '@/config/config.dto'
import { ConfigValidationModule } from '@/config/config.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [LedgerService],
	exports: [LedgerService],
})
export class LedgerModule {}
