import { RecurlyConfigDto } from '../../../../config/config.dto'
import { ConfigValidationModule } from '../../../../config/config.module'
import { AccountAcquisitionService } from './acquisition.service'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [AccountAcquisitionService],
	exports: [AccountAcquisitionService],
})
export class AccountAcquisitionModule {}
