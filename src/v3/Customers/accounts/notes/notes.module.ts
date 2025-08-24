import { RecurlyConfigDto } from '../../../../config/config.dto'
import { ConfigValidationModule } from '../../../../config/config.module'
import { AccountNotesService } from './notes.service'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [AccountNotesService],
	exports: [AccountNotesService],
})
export class AccountNotesModule {}
