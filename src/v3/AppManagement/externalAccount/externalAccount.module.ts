import { ExternalAccountService } from './externalAccount.service'
import { RecurlyConfigDto } from '@config/config.dto'
import { ConfigValidationModule } from '@config/config.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	controllers: [],
	providers: [ExternalAccountService],
	exports: [ExternalAccountService],
})
export class ExternalAccountModule {}
