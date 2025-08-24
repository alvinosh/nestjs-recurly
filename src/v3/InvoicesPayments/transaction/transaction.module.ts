import { TransactionService } from './transaction.service'
import { RecurlyConfigDto } from '@config/config.dto'
import { ConfigValidationModule } from '@config/config.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [TransactionService],
	exports: [TransactionService],
})
export class TransactionModule {}
