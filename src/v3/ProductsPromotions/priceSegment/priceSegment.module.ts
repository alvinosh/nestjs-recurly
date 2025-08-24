import { PriceSegmentService } from './priceSegment.service'
import { RecurlyConfigDto } from '@config/config.dto'
import { ConfigValidationModule } from '@config/config.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	controllers: [],
	providers: [PriceSegmentService],
	exports: [PriceSegmentService],
})
export class PriceSegmentModule {}
