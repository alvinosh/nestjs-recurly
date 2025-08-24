import { RecurlyConfigDto } from '../../config/config.dto'
import { ConfigValidationModule } from '../../config/config.module'
import { LineItemService } from './lineItem.service'
import { Module } from '@nestjs/common'

@Module({
    imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [LineItemService],
	exports: [LineItemService],
})
export class LineItemModule {}
