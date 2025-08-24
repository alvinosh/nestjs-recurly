import { RecurlyConfigDto } from '../../../../config/config.dto'
import { ConfigValidationModule } from '../../../../config/config.module'
import { AddOnService } from './addon.service'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [AddOnService],
	exports: [AddOnService],
})
export class AddOnModule {}
