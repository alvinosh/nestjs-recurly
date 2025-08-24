import { AccountAcquisitionService } from './acquisition.service'
import { RecurlyConfigDto } from '@config/config.dto'
import { ConfigValidationModule } from '@config/config.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [AccountAcquisitionService],
	exports: [AccountAcquisitionService],
})
export class AccountAcquisitionModule {}
