import { RecurlyConfigDto } from '../../config/config.dto'
import { ConfigValidationModule } from '../../config/config.module'
import { InvoiceService } from './invoice.service'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	controllers: [],
	providers: [InvoiceService],
	exports: [InvoiceService],
})
export class InvoiceModule {}
