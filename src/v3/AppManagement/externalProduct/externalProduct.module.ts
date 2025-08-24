import { ExternalProductService } from './externalProduct.service'
import { RecurlyConfigDto } from '@config/config.dto'
import { ConfigValidationModule } from '@config/config.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [ExternalProductService],
	exports: [ExternalProductService],
})
export class ExternalProductModule {}
