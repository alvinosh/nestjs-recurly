import { ChangeService } from './change.service'
import { RecurlyConfigDto } from '@config/config.dto'
import { ConfigValidationModule } from '@config/config.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [ChangeService],
	exports: [ChangeService],
})
export class ChangeModule {}
