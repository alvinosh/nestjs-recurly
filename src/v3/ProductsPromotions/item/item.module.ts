import { RecurlyConfigDto } from '../../../config/config.dto'
import { ConfigValidationModule } from '../../../config/config.module'
import { ItemService } from './item.service'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	controllers: [],
	providers: [ItemService],
	exports: [ItemService],
})
export class ItemModule {}
